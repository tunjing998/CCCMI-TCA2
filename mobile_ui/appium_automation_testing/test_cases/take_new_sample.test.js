var expect = require('chai').expect;
require('expect-webdriverio');
const sinon = require('sinon');
var testVariables = require('../test_variables');

async function getRivers(coordinateString) {
  // url ?latitute=7.5&longitute=12
  var rivers = await fetch(
    'http://django-env.eba-9eikjyb6.us-west-2.elasticbeanstalk.com/aquality_server/rivers/' +
      coordinateString,
  );
  return rivers.json();
}

describe('Testing user Landing page', () => {
  before(() => {
    $('~' + testVariables.splashTouchableOpacityButton).click();
    $('~' + testVariables.signScreenUserName).setValue('user1');
    $('~' + testVariables.signScreenPassword).setValue('password');
    $('~' + testVariables.signScreenSignInButton).click();
  });

  beforeEach(() => {
    $('~' + testVariables.homeScreenContainer).waitForDisplayed(10000, false);
  });

  it('should have two buttons on home screen 1.take new sample button, 2.view sample', async => {
    expect(
      $('~' + testVariables.homeScreenTakeNewSampleButton).isDisplayed(),
    ).to.equal(true);
    expect(
      $('~' + testVariables.homeScreenViewSampleButton).isDisplayed(),
    ).to.equal(true);
  });

  it('should show search river screen container after clicking take new sample button', async => {
    $('~' + testVariables.homeScreenTakeNewSampleButton).click();
    $('~' + testVariables.searchRiverScreenContainer).waitForDisplayed(10000);
    expect(
      $('~' + testVariables.searchRiverScreenContainer).isDisplayed(),
    ).to.equal(true);
  });
});

describe('Testing search river screen', () => {
  beforeEach(() => {
    $('~' + testVariables.searchRiverScreenContainer).waitForDisplayed(
      10000,
      false,
    );
  });

  it('should show empty locate text input before locate icon is clicked', async => {
    expect($('~' + testVariables.searchRiverLocateInput).getText()).to.equal(
      null,
    );
  });
  it('should show locate text after locate icon is clicked', async => {
    driver.setGeoLocation({
      latitude: '53.3541159578443',
      longitude: '-6.355573949174074',
    });
    driver.pause(1000);
    $('~' + testVariables.searchRiverLocateIcon).click();
    driver.pause(1000);
    expect($('~' + testVariables.searchRiverLocateInput).getText()).to.equal(
      '53.3541159578443, -6.355573949174074',
    );
  });
  it('should click a button and show river detail screen', async => {
    $('~' + testVariables.searchRiverSearchIcon).click();
    driver.pause(1000);
    const listCells = $$('~flatlistItem');
    expect(listCells).to.have.lengthOf(2);
    listCells[0].click();
    $('~' + testVariables.riverDetailContainer).waitForDisplayed(10000, false);
    expect($('~' + testVariables.riverDetailContainer).isDisplayed()).to.equal(
      true,
    );
  });
});

describe('Testing search details screen', () => {
  beforeEach(() => {
    $('~' + testVariables.riverDetailContainer).waitForDisplayed(10000, false);
  });

  it('should show river detail screen after click choose button', async => {
    $('~' + testVariables.riverDetailChooseRiverButton).click();
    $('~' + testVariables.riverDetailScreen).waitForDisplayed(10000, false);
    expect($('~' + testVariables.riverDetailScreen).isDisplayed()).to.equal(
      true,
    );
  });
});
