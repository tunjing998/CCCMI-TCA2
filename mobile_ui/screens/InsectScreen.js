import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Text, Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import testVariables from '../appium_automation_testing/test_variables';
import axios from 'axios';

const InsectScreen = ({navigation, route}) => {
  const {colors} = useTheme();
  const theme = useTheme();
  const [insectList, setInsectList] = useState([]);
  const [image, setImage] = useState('');

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
    tinyLogo: {
      width: 80,
      height: 80,
    },
  });

  const renderInsect = () => {
    if (insectList.length > 0) {
      console.log(insectList);
      let comp = [];
      comp.push(<Text style={{alignSelf: 'flex-start'}}>Selected Insects:</Text>)
      insectList.map(item => {
        comp.push(
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.insect_image,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                width: 150,
                textAlign: 'center',
                color: colors.text,
              }}>
              {item.insect_name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                width: 150,
                textAlign: 'center',
                color: colors.text,
              }}>
              {item.amount}
            </Text>
          </View>,
        );
      });
      return comp;
    }
  };

  useEffect(() => {
    if (route.params?.post) {
      setInsectList(route.params.post);
    }
  }, [route.params?.post]);

  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.insectScreenContainer}
      testID={testVariables.insectScreenContainer}>
      {renderInsect()}
      <Button
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
      <Button
        accessibilityLabel={testVariables.insectScreenAnalyzeInsectButton}
        testID={testVariables.insectScreenAnalyzeInsectButton}
        title="Analyze Insect"
        onPress={() => {navigation.navigate('AnalyzeInsect')}}
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
