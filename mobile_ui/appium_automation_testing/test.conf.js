const path = require('path');
const absolutePath = path.resolve(
  '../android/app/build/outputs/apk/debug/app-debug.apk',
);

const testConfig = {
  appiumVersion: '1.13.0',
  platformName: 'Android',
  platformVersion: '11',
  deviceName: 'Android 3a XL',
  app: absolutePath,
  automationName: 'UiAutomator2',
};

module.exports = testConfig;
