# CCCMI(4th year project DKIT.)

# Aquality 2.0

Aquality 2.0 is a **Mobile Application** , it helps Citizen Scientists to get more accurate water quality via **AI model** to analysis insects and uses **IOT** technology to talk with 2 sensors (**PH, Temperature**) to get accurate extra information of water body.

Technologies: 

- **Hardware:** Arduino

- **App:** React Native

- **Cloud:** AWS, PubNub 

- **AI:** Yolov3+LabelImg

- **Backend**: Django + PostgreSQL

- **UI Testing**: Appium + WendriveIO

- **API Testing**: Postman + newman + Github Actions

  

## Folder Description

**.github/workflows**: GitHub action workflows used in CI pipeline

**AI Model**: AI model build using Yolov3 and LabelImg helps to recognize insects

**Aquality_Two_Backend_Server:**  Server build on Django supports for Mobile Application and data storage

**Arduino/TTGO_T-Call**: Arduino support PH and temperature sensor catch data and send to PubNub

**mobile_ui**: Mobile Application build on React Native including UI E2E testing.

## Installation

### Aquality_Two_Backend_Server: 

1. Get into 

```bash
pip install foobar
```

#### Usage

```python
import foobar

foobar.pluralize('word') # returns 'words'
foobar.pluralize('goose') # returns 'geese'
foobar.singularize('phenomena') # returns 'phenomenon'
```

### Mobile Application: 

1. Make sure you have React Native Environments or follow the link to set up: [Setting up the development environment](https://reactnative.dev/docs/environment-setup)  
2. Get into mobile_ui folder, use the package manager to install dependencies.

```bash
yarn install
```

3. Launch Application on Android Device

   yarn install

