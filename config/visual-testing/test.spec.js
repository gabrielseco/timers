const puppeteer = require('puppeteer');
const { startServer } = require('polyserve');
const fs = require('fs');

const { TEST_DIR } = require('./constants');
const { takeAndCompareScreenshot } = require('./utils');

describe('👀 screenshots are correct', () => {
  let polyserve;
  let browser;
  let page;

  // This is ran when the suite starts up.
  beforeEach(async () => {
    // This is where you would substitute your python or Express server or whatever.
    polyserve = await startServer({ port: 4000 });

    // Create the test directory if needed. This and the goldenDir
    // variables are global somewhere.
    if (!fs.existsSync(TEST_DIR)) fs.mkdirSync(TEST_DIR);

    // And its wide screen/small screen subdirectories.
    if (!fs.existsSync(`${TEST_DIR}/wide`)) fs.mkdirSync(`${TEST_DIR}/wide`);
    if (!fs.existsSync(`${TEST_DIR}/narrow`))
      fs.mkdirSync(`${TEST_DIR}/narrow`);
  });

  // This is ran when the suite is done. Stop your server here.
  afterEach(done => polyserve.close(done));

  // This is ran before every test. It's where you start a clean browser.
  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  // This is ran after every test; clean up after your browser.
  afterEach(() => browser.close());

  // Wide screen tests!
  describe('wide screen', () => {
    beforeEach(async () => {
      return page.setViewport({ width: 1200, height: 600 });
    });
    it('/view1', () => {
      return takeAndCompareScreenshot(page, '', 'wide');
    });
    // And your other routes, 404, etc.
  });

  // Narrow screen tests are the same, but with a different viewport.
  describe('narrow screen', () => {
    beforeEach(async () => {
      return page.setViewport({ width: 375, height: 667 });
    });
    it('/view1', () => {
      return takeAndCompareScreenshot(page, '', 'narrow');
    });
  });
});
