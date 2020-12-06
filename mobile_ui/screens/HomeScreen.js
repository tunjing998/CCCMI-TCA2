import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {Button} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      {/* <Text style={{color: colors.text}}>Home Screen</Text> */}
      <Button
        ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
          colors: ['#07beb8', '#3dccc7', '#68d8d6'],
          start: {x: 0, y: 0},
          end: {x: 1, y: 0},
        }}
        title="Take new sample"
        titleStyle={styles.title}
        containerStyle={styles.buttonContainer}
        onPress={() => navigation.navigate('SearchRiverScreen')}
      />
      <Button
        ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
          colors: ['#07beb8', '#3dccc7', '#68d8d6'],
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
    paddingVertical: 25,
  },
  buttonContainer: {
    padding: 35,
  },
});
