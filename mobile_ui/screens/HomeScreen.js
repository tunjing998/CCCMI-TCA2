import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {Button} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import testVariables from '../appium_automation_testing/test_variables';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();

  const theme = useTheme();

  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.homeScreenContainer}
      testID={'homeScreenContainer'}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

      <Button
        testID={'homeScreenTakeNewSampleButton'}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ['#e76f51', '#f4a261'],
          start: {x: 0, y: 0},
          end: {x: 1, y: 0},
        }}
        title="Take new sample"
        titleStyle={styles.title}
        containerStyle={styles.buttonContainer}
        onPress={() => navigation.navigate('SearchRiverScreen')}
        accessibilityLabel={testVariables.homeScreenTakeNewSampleButton}
      />
      <Button
        accessibilityLabel={testVariables.homeScreenViewSampleButton}
        testID={testVariables.homeScreenViewSampleButton}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ['#e76f51', '#f4a261'],
          start: {x: 0, y: 0},
          end: {x: 1, y: 0},
        }}
        title="View sample"
        titleStyle={styles.title}
        containerStyle={styles.buttonContainer}
      />
      <Button
        title="upload image test"
        onPress={() => navigation.navigate('uploadImage')}
      />
      <Button
        title="upload image to server test"
        onPress={() => navigation.navigate('uploadImageToServer')}
      />
      <Button
        title="result test"
        onPress={() => navigation.navigate('resultPage')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 31,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  buttonContainer: {
    padding: 35,
  },
});
