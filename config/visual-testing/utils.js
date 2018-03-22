/* eslint no-plusplus: 0 */

/* eslint no-unneeded-ternary: 0 */

/* eslint prefer-template: 0 */

const fs = require('fs');
const pixelmatch = require('pixelmatch');
const { PNG } = require('node-png');
const { TEST_DIR, GOLDEN_DIR } = require('./constants');

function compareScreenshots(fileName) {
  return new Promise(resolve => {
    const img1 = fs
      .createReadStream(`${TEST_DIR}/${fileName}.png`)
      .pipe(new PNG())
      .on('parsed', doneReading);
    const img2 = fs
      .createReadStream(`${GOLDEN_DIR}/${fileName}.png`)
      .pipe(new PNG())
      .on('parsed', doneReading);

    let filesRead = 0;
    function doneReading() {
      // Wait until both files are read.
      if (++filesRead < 2) return;

      // The files should be the same size.
      expect(img1.width).toBe(img2.width);
      expect(img1.height).toBe(img2.height);

      // Do the visual diff.
      const diff = new PNG({ width: img1.width, height: img2.height });
      const numDiffPixels = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        img1.width,
        img1.height,
        { threshold: 0.1 }
      );

      // The files should look the same.
      expect(numDiffPixels).toBe(0);
      resolve();
    }
  });
}

export async function takeScreenshot(page, route, filePrefix) {
  const fileName = filePrefix + '/' + (route ? route : 'index');

  // Start the browser, go to that page, and take a screenshot.
  await page.goto(`http://127.0.0.1:8000/${route}`);
  await page.screenshot({ path: `${GOLDEN_DIR}/${fileName}.png` });
}

export async function takeAndCompareScreenshot(page, route, filePrefix) {
  // If you didn't specify a file, use the name of the route.
  const fileName = filePrefix + '/' + (route ? route : 'index');

  // Start the browser, go to that page, and take a screenshot.
  await page.goto(`http://127.0.0.1:8000/${route}`);
  await page.screenshot({ path: `${TEST_DIR}/${fileName}.png` });

  // Test to see if it's right.
  return compareScreenshots(fileName);
}
