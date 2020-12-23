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

describe('Testing tabs with screens', () => {
  before(() => {
    $('~' + testVariables.riverDetailContainer).waitForDisplayed(10000, false);
  });

  it('should display 3 tabs and default river details screen after click choose button', async => {
    $('~' + testVariables.riverDetailChooseRiverButton).click();
    $('~' + testVariables.riverDetailScreen).waitForDisplayed(10000, false);
    expect(
      $('~' + testVariables.riverDetailScreen).isDisplayed(),
      'river details screen should be displayed',
    ).to.be.true;

    expect(
      $('~' + testVariables.mainTabScreenDetailsTab).isDisplayed(),
      'details tab should be displayed',
    ).to.be.true;

    expect(
      $('~' + testVariables.mainTabScreenArduinoTab).isDisplayed(),
      'Arduino tab should be displayed',
    ).to.be.true;

    expect(
      $('~' + testVariables.mainTabScreenInsectTab).isDisplayed(),
      'Insect tab should be displayed',
    ).to.be.true;
  });
  it('should display arduino screen after clicking Arduino tab, ', () => {
    expect(
      $('~' + testVariables.mainTabScreenArduinoTab).isDisplayed(),
      'Arduino tab should be displayed',
    ).to.be.true;

    $('~' + testVariables.mainTabScreenArduinoTab).click();
    driver.pause(1000);
    expect(
      $('~' + testVariables.arduinoScreenContainer).isDisplayed(),
      'Arduino Connected Screen is displayed',
    ).to.be.true;
  });

  it('should show Insert Arduino id', () => {
    expect(
      $('~' + testVariables.arduinoScreenIDTextInput).isDisplayed(),
      'arduino ID Text Input should be displayed',
    ).to.be.true;

    $('~' + testVariables.arduinoScreenIDTextInput).setValue('#01');

    expect(
      $('~' + testVariables.arduinoScreenIDTextInput).getText(),
      'Arduino id should be #01',
    ).to.equal('#01');
  });

  it('should show Arduino connect screen after press search icon button', () => {
    expect(
      $('~' + testVariables.arduinoScreenSearchIconButton).isDisplayed(),
      'search icon button should be displayed',
    ).to.be.true;

    $('~' + testVariables.arduinoScreenSearchIconButton).click();
    driver.pause(1000);

    expect(
      $('~' + testVariables.arduinoConnectScreenContainer).isDisplayed(),
      'Arduino connect screen should be displayed',
    ).to.be.true;
  });

  it('should show sensors data', () => {
    expect(
      $('~' + testVariables.arduinoConnectScreenTemperatureValue).getValue(),
      'Temperature Value is not null',
    ).to.not.equal(null);
    expect(
      $('~' + testVariables.arduinoConnectScreenPHValue).getValue(),
      'PH Value is not null',
    ).to.not.equal(null);
  });

  it('should go back to the Arduino Screen ', () => {
    driver.back();
    driver.pause(1000);
    expect(
      $('~' + testVariables.arduinoScreenContainer).isDisplayed(),
      'Arduino Screen should be displayed',
    ).to.be.true;
  });

  it('should show insect screen after press insect tab', () => {
    expect(
      $('~' + testVariables.mainTabScreenInsectTab).isDisplayed(),
      'insect tab should be displayed',
    ).to.be.true;

    $('~' + testVariables.mainTabScreenInsectTab).click();
    driver.pause(1000);

    expect(
      $('~' + testVariables.insectScreenContainer).isDisplayed(),
      'Insect screen should be displayed',
    ).to.be.true;

    expect(
      $('~' + testVariables.insectScreenSelectInsectButton).isDisplayed(),
      'Select insect button should be displayed',
    ).to.be.true;
    expect(
      $('~' + testVariables.insectScreenAnalyzeInsectButton).isDisplayed(),
      'Analyze insect button should be displayed',
    ).to.be.true;
  });

  it('should show display select insects screen', () => {
    $('~' + testVariables.insectScreenSelectInsectButton).click();
    driver.pause(1000);

    expect(
      $('~' + testVariables.chooseInsectScreenContainer).isDisplayed(),
      'Select insect screen should be displayed',
    ).to.be.true;
  });

  it('should display insects groups', () => {
    expect(
      $('~' + testVariables.group1List).isDisplayed(),
      'Insect group 1 is displayed',
    ).to.be.true;
    expect(
      $('~' + testVariables.group2List).isDisplayed(),
      'Insect group 2 is displayed',
    ).to.be.true;
    expect(
      $$('~' + testVariables.group1ListItem),
      'group 1 List items length > 1',
    ).to.have.length.above(1);
    expect(
      $$('~' + testVariables.group2ListItem),
      'group 2 List items length > 1',
    ).to.have.length.above(1);
  });

  it('should display insects groups', () => {
    expect(
      $('~' + testVariables.group1List).isDisplayed(),
      'Insect group 1 is displayed',
    ).to.be.true;
    expect(
      $('~' + testVariables.group2List).isDisplayed(),
      'Insect group 2 is displayed',
    ).to.be.true;
    expect(
      $$('~' + testVariables.group1ListItem),
      'group 1 List items length > 1',
    ).to.have.length.above(1);
    expect(
      $$('~' + testVariables.group2ListItem),
      'group 2 List items length > 1',
    ).to.have.length.above(1);
  });

  it('should display entered number for an insect item', () => {
    const group1ListItem = $$('~' + testVariables.group1ListItem);
    const extendBarTextInput = $('~' + testVariables.extendBarTextInput);
    group1ListItem[0].click();
    driver.pause(1000);
    expect(extendBarTextInput.isDisplayed(), 'Extend bar is displayed').to.be
      .true;
    extendBarTextInput.setValue(10);
    driver.pause(1000);
  });

  it('should display insect screen after press finish button', async () => {
    driver.touchScroll(10, 1000);

    const finishSelectButton = $('~' + testVariables.finishSelectButton);
    expect(
      finishSelectButton.isDisplayed(),
      'Finish select button is displayed',
    ).to.be.true;

    finishSelectButton.click();
    driver.pause(1000);
    expect(
      testVariables.insectScreenContainer.isDisplayed(),
      'Insect screen is displayed',
    ).to.be.true;
  });

  it('should pop out three options(take photo, choose form library, and cancel)', async () => {
    $('~' + testVariables.insectScreenAnalyzeInsectButton).click();
    driver.pause(1000);
    expect(
      testVariables.takePhotoButton.isDisplayed(),
      'Take photo button is displayed',
    ).to.be.true;
    expect(
      testVariables.chooseFormLibraryButton.isDisplayed(),
      'Choose from library button is displayed',
    ).to.be.true;
    expect(
      testVariables.cancelButton.isDisplayed(),
      'Cancel button is displayed',
    ).to.be.true;
  });

  it('should open camera after clicking take photo button)', async () => {
    $('~' + testVariables.takePhotoButton).click();
    driver.pause(1000);
    expect(
      testVariables.takePhotoButton.isDisplayed(),
      'Take photo button is displayed',
    ).to.be.true;
  });
});
