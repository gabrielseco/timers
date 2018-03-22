const puppeteer = require('puppeteer');
const { startServer } = require('polyserve');
const fs = require('fs');

const { GOLDEN_DIR } = require('./constants');
const { takeScreenshot } = require('./utils');

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
    if (!fs.existsSync(GOLDEN_DIR)) fs.mkdirSync(GOLDEN_DIR);

    // And its wide screen/small screen subdirectories.
    if (!fs.existsSync(`${GOLDEN_DIR}/wide`))
      fs.mkdirSync(`${GOLDEN_DIR}/wide`);
    if (!fs.existsSync(`${GOLDEN_DIR}/narrow`))
      fs.mkdirSync(`${GOLDEN_DIR}/narrow`);
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
      return takeScreenshot(page, '', 'wide');
    });
    // And your other routes, 404, etc.
  });

  // Narrow screen tests are the same, but with a different viewport.
  describe('narrow screen', () => {
    beforeEach(async () => {
      return page.setViewport({ width: 375, height: 667 });
    });
    it('/view1', () => {
      return takeScreenshot(page, '', 'narrow');
    });
  });
});
