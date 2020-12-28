var expect = require('chai').expect;
require('expect-webdriverio');
const sinon = require('sinon');
var testVariables = require('../test_variables');

describe('Testing user Landing page', () => {
  before(() => {
    $('~' + testVariables.splashContainer).waitForDisplayed(10000, false);
  });
  it('should upload photo from camera)', async () => {
    // driver.execute('adb shell se keyevent 3');
    driver.pressKeyCode(3);
    driver.findElement(name('Camera')).click();
    // driver.pressKeyCode(27);
    // driver.sleep(2000);
  });
});
