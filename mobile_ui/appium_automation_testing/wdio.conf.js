var testConfig = require('./test.conf.js');

exports.config = {
  services: ['appium'],
  port: 4723,
  runner: 'local',
  specs: ['./test_cases/camera.test.js'],
  // specs: ['./test_cases/take_new_sample.test.js'],
  // specs: ['./test_cases/**/*.js'],
  capabilities: [
    {
      maxInstances: 1,
      appiumVersion: testConfig.appiumVersion,
      platformName: testConfig.platformName,
      platformVersion: testConfig.platformVersion,
      deviceName: testConfig.deviceName,
      app: testConfig.app,
      automationName: testConfig.automationName,
    },
  ],
  logLevel: 'trace',
  bail: 0,
  waitforTimeout: 50000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
};
