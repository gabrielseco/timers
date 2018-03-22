const path = require('path');

/* 
  using process.cwd not the most reliable thing in the world 
  according to stackoverflow
  https://stackoverflow.com/a/18721515
*/
const TEST_DIR = path.join(process.cwd(), '/snapshots/__TEST__');
const GOLDEN_DIR = path.join(process.cwd(), '/snapshots/__GOLDEN__');

module.exports = {
  TEST_DIR: TEST_DIR,
  GOLDEN_DIR: GOLDEN_DIR
};
