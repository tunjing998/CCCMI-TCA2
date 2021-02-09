import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Text, Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import testVariables from '../appium_automation_testing/test_variables';
import AsyncStorage from '@react-native-community/async-storage';

const InsectScreen = ({navigation, route}) => {
  const {colors} = useTheme();
  const [insectList, setInsectList] = useState([]);
  const [image, setImage] = useState('');
  const [analysedInsect, setAnalysedInsect] = useState([]);

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

  const renderSelectedInsect = () => {
    if (insectList.length > 0) {
      console.log(insectList);    //selected insect list
      let comp = [];
      comp.push(<Text style={{alignSelf: 'flex-start', fontSize: 20, fontWeight: 'bold'}}>Selected :</Text>)
      insectList.map(item => {
        comp.push(
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

      storeData(insectList);

      return comp;
    }
  };

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('selected_insect', jsonValue);
      console.log('stored data: ' + jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const renderAnalysedInsect = () => {
    if (analysedInsect.length > 0) {
      console.log('analysed insect list:' + analysedInsect);
      let comp = [];
      comp.push(<Text style={{alignSelf: 'flex-start', fontSize: 20, fontWeight: 'bold'}}>Analysed Insects:</Text>)
      analysedInsect.map(item => {
        comp.push(
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.image,
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
              {item.count}
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
    if (route.params?.insect) {
      setAnalysedInsect(route.params.insect)
    }
  }, [route.params?.post, route.params?.insect]);

  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.insectScreenContainer}
      testID={testVariables.insectScreenContainer}>

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
          marginTop: 50
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
          marginBottom: 50
        }}
      />
      

      <ScrollView>
      {renderSelectedInsect()}
      {renderAnalysedInsect()}
      </ScrollView>
    </View>
  );
};

export default InsectScreen;
