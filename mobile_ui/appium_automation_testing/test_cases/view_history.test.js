var expect = require('chai').expect;
var testVariables = require('../test_variables');

describe('Testing splash landing page', () => {
  // Adding time out to make sure the app is load prior to test is run
  beforeEach(() => {
    $('~' + testVariables.splashContainer).waitForDisplayed(10000, false);
  });

  it('should display splash Container', async => {
    expect($('~' + testVariables.splashContainer).isDisplayed()).to.equal(true);
  });
  it('should display sign Screen Container after clicking splash Touchable Opacity Button', async => {
    $('~' + testVariables.splashTouchableOpacityButton).click();

    $('~signScreenContainer').waitForDisplayed(10000);
    expect($('~' + testVariables.signScreenContainer).isDisplayed()).to.equal(
      true,
    );
  });
});

describe('Testing Sign in activity', () => {
  beforeEach(() => {
    $('~' + testVariables.signScreenContainer).waitForDisplayed(10000, false);
  });
  it('should fail on signing in (empty username or password)', async => {
    $('~' + testVariables.signScreenUserName).setValue('');
    $('~' + testVariables.signScreenPassword).setValue('');

    $('~' + testVariables.signScreenSignInButton).click();

    expect(driver.getAlertText()).to.equal(
      'Wrong Input!\nUsername or password field cannot be empty.',
    );

    driver.execute('mobile:acceptAlert', {action: 'accept'});
  });

  it('should fail on signing in (username or password is incorrect)', async => {
    $('~' + testVariables.signScreenUserName).setValue('invalidate username');
    $('~' + testVariables.signScreenPassword).setValue('123456');

    $('~' + testVariables.signScreenSignInButton).click();

    expect(driver.getAlertText()).to.equal(
      'Invalid User!\nUsername or password is incorrect.',
    );

    driver.execute('mobile:acceptAlert', {action: 'accept'});
  });

  it('should successful on signing in and show home Screen', async => {
    $('~' + testVariables.signScreenUserName).setValue('user1');
    $('~' + testVariables.signScreenPassword).setValue('password');

    $('~' + testVariables.signScreenSignInButton).click();

    $('~' + testVariables.homeScreenContainer).waitForDisplayed(10000);
    expect($('~' + testVariables.homeScreenContainer).isDisplayed()).to.equal(
      true,
    );
  });
});

describe('Testing user view all history', () => {
  beforeEach(() => {
    expect($('~' + testVariables.homeScreenContainer).isDisplayed()).to.equal(
      true,
    );
  });
  it('should have two buttons on home screen 1.take new sample button, 2.view sample', async => {
    expect(
      $('~' + testVariables.homeScreenTakeNewSampleButton).isDisplayed(),
    ).to.equal(true);
    expect(
      $('~' + testVariables.homeScreenViewSampleButton).isDisplayed(),
    ).to.equal(true);
  });

  it('should show sampling history screen after click view sample button', async => {
    $('~' + testVariables.homeScreenViewSampleButton).click();
    expect(
      $('~' + testVariables.sampleHistoryScreenContainer).isDisplayed(),
    ).to.equal(true);
  });
});
