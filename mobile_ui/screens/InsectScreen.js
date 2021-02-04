import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Text, Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import testVariables from '../appium_automation_testing/test_variables';
import axios from 'axios';

const InsectScreen = ({navigation}) => {
  const {colors} = useTheme();
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    desc: {
      marginBottom: 20,
      color: colors.text,
    },
  });

  return (
    <View
    
      style={styles.container}
      accessibilityLabel={testVariables.insectScreenContainer}
      testID={testVariables.insectScreenContainer}>
      <Text style={styles.desc}>Your Insects found section is empty!</Text>
      <Text style={styles.desc}>
        If insects is found, choose one of the method below to start.
      </Text>
      <Button
        // ViewComponent={LinearGradient}
        title="Select Insect"
        onPress={() => navigation.navigate('selectInsect1')}
        accessibilityLabel={testVariables.insectScreenSelectInsectButton}
        testID={testVariables.insectScreenSelectInsectButton}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ['#4c4cff', '#6666ff'],
          start: {x: 0, y: 0},
          end: {x: 0, y: 1.5},
        }}
        buttonStyle={{
          margin: 5,
          padding: 20,
          borderRadius: 20,
          width: 300,
        }}
      />
      <Text />
      <Button
        // ViewComponent={LinearGradient}
        accessibilityLabel={testVariables.insectScreenAnalyzeInsectButton}
        testID={testVariables.insectScreenAnalyzeInsectButton}
        title="Analyze Insect"
        onPress={() => alert('analyze insect')}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ['#4c4cff', '#6666ff'],
          start: {x: 0, y: 0},
          end: {x: 0, y: 1.5},
        }}
        buttonStyle={{
          margin: 5,
          padding: 20,
          borderRadius: 20,
          width: 300,
        }}
      />
      <Button
        title="Finish"
        buttonStyle={{
          backgroundColor: 'lightgreen',
          marginTop: 30,
          borderRadius: 10,
          width: 100,
        }}
        titleStyle={{color: 'black'}}
      />
    </View>
  );
};

export default InsectScreen;
