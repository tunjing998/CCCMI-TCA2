import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import testVariables from '../appium_automation_testing/test_variables';

const link = './history.json';
var json_data = require('./history.json');
var riverNameList = [];
var dateList = [];

const SampleHistoryScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  //   const [dateList, renderDateList] = useState([]);
  useEffect(() => {
    fetch(link)
      .then(response => response.json())
      .then(json => alert(json))
      .catch(error => alert(error));
    fetchData();
    setLoading(false);
  }, []);

  const fetchData = () => {
    console.log('fetch data called');
    json_data.forEach(ele => {
      dateList.push(reconstructDate(ele.date));
      riverNameList.push(ele.river_name);
    });
  };

  const reconstructDate = oldDate => {
    let date1 = new Date(Date.parse(oldDate));
    let year = date1.getFullYear();
    let month =
      date1.getMonth() < 10 ? '0' + date1.getMonth() : date1.getMonth();
    let date = date1.getDate() < 10 ? '0' + date1.getDate() : date1.getDate();

    let newDate = year + '-' + month + '-' + date;
    return newDate;
  };
  return (
    <View
      accessibilityLabel={testVariables.sampleHistoryScreenContainer}
      testID={testVariables.sampleHistoryScreenContainer}>
      <Text>SampleHistoryScreen!</Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <FlatList
            data={dateList}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => {
              return (
                <View>
                  <Button title={item} />
                </View>
              );
            }}
          />

          <FlatList
            data={riverNameList}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => {
              return (
                <View>
                  <Button title={item} />
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SampleHistoryScreen;
