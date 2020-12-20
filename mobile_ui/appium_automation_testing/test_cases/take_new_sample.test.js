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
    $('~splashTouchableOpacityButton').click();
    $('~signScreenUserName').setValue('user1');
    $('~signScreenPassword').setValue('password');
    $('~signScreenSignInButton').click();
  });

  beforeEach(() => {
    $('~homeScreenContainer').waitForDisplayed(10000, false);
  });

  it('should have two buttons on home screen 1.take new sample button, 2.view sample', async => {
    expect($('~homeScreenTakeNewSampleButton').isDisplayed()).to.equal(true);
    expect($('~homeScreenViewSampleButton').isDisplayed()).to.equal(true);
  });

  it('should show search river screen container after clicking take new sample button', async => {
    $('~homeScreenTakeNewSampleButton').click();
    $('~searchRiverScreenContainer').waitForDisplayed(10000);
    expect($('~searchRiverScreenContainer').isDisplayed()).to.equal(true);
  });
});

describe('Testing search river screen', () => {
  beforeEach(() => {
    $('~searchRiverScreenContainer').waitForDisplayed(10000, false);
  });

  it('should show empty locate text input before locate icon is clicked', async => {
    expect($('~searchRiverLocateInput').getText()).to.equal(null);
  });
  it('should show locate text after locate icon is clicked', async => {
    driver.setGeoLocation({
      latitude: '53.3541159578443',
      longitude: '-6.355573949174074',
    });
    driver.pause(1000);
    $('~searchRiverLocateIcon').click();
    driver.pause(1000);
    expect($('~searchRiverLocateInput').getText()).to.equal(
      '53.3541159578443, -6.355573949174074',
    );
  });
  it('should click a button and show river detail screen', async => {
    $('~searchRiverSearchIcon').click();
    driver.pause(1000);
    const listCells = $$('~flatlistItem');
    expect(listCells).to.have.lengthOf(2);
    listCells[0].click();
    $('~riverDetailContainer').waitForDisplayed(10000, false);
    expect($('~riverDetailContainer').isDisplayed()).to.equal(true);
  });
});

describe('Testing search details screen', () => {
  beforeEach(() => {
    $('~riverDetailContainer').waitForDisplayed(10000, false);
  });

  it('should show river detail screen after click choose button', async => {
    $('~riverDetailChooseRiverButton').click();
    $('~riverDetailScreen').waitForDisplayed(10000, false);
    expect($('~riverDetailScreen').isDisplayed()).to.equal(true);
  });
});
