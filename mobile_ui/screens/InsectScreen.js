import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Text, Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import testVariables from '../appium_automation_testing/test_variables';

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
        buttonStyle={{paddingHorizontal: 20}}
        titleStyle={{fontSize: 20}}
        type="outline"
        raised
      />
      <Text />
      <Button
        // ViewComponent={LinearGradient}
        accessibilityLabel={testVariables.insectScreenAnalyzeInsectButton}
        testID={testVariables.insectScreenAnalyzeInsectButton}
        title="Analyze Insect"
        onPress={() => alert('analyze insect')}
        buttonStyle={{paddingHorizontal: 20}}
        titleStyle={{fontSize: 20}}
        type="outline"
        raised
      />
    </View>
  );
};

export default InsectScreen;
