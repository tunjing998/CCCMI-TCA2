import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {Button} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();

  const theme = useTheme();

  return (
    <View
      style={styles.container}
      accessibilityLabel="homeScreenContainer"
      testID="homeScreenContainer">
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

      <Button
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
        accessibilityLabel="homeScreenTakeNewSampleButton"
        testID="homeScreenTakeNewSampleButton"
      />
      <Button
        accessibilityLabel="homeScreenViewSampleButton"
        testID="homeScreenViewSampleButton"
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
    fontSize: 30,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  buttonContainer: {
    padding: 35,
  },
});
