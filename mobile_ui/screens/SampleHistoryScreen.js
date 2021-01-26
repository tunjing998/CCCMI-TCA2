import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import testVariables from '../appium_automation_testing/test_variables';
import DateTimePicker from '@react-native-community/datetimepicker';

import json_data from './history.json';
import {TextInput} from 'react-native-gesture-handler';

let riverNameList = [];
let historyData = {};
let dateList = [];

/**
 * @param {*} {navigation}
 * @description Sample History Screen component
 * @return {SampleHistoryScreen}
 */
const SampleHistoryScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [data, setData] = useState([]);

  // FOR DATE
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [river, setRiver] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios' ? true : false);
    setDate(currentDate);
    filterDate('date', reconstructDate(currentDate));
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const formatDate = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  // END FOR DATE

  useEffect(() => {
    fetchData();
    convertData();
    setValues();
    setLoading(false);
  }, []);

  /**
   * @function fetchData
   * @description fetch data from API
   */
  const fetchData = () => {
    console.log('fetch data called');
  };

  /**
   * @function convertData
   * @description convert fetched data into local data list,
   *              add a new filed called newDate.
   *
   */
  const convertData = () => {
    historyData = JSON.parse(JSON.stringify(json_data));
    for (const el of historyData) {
      if (el.date) {
        el.newDate = reconstructDate(el.date);
      }
    }
  };

  /**
   * @function setValues
   * @description set riverName list and dateList
   *
   */
  const setValues = () => {
    historyData.forEach(ele => {
      riverNameList.push(ele.river_name);
      dateList.push(ele.newDate);
    });
  };

  /**
   * @function reconstructDate
   * @param {String} oldDate
   * @description convert data string in new format: YYYY-mm-dd
   */
  const reconstructDate = oldDate => {
    let date1 = new Date(Date.parse(oldDate));
    let year = date1.getFullYear();
    let month =
      date1.getMonth() + 1 < 10
        ? '0' + (date1.getMonth() + 1)
        : date1.getMonth() + 1;
    let date = date1.getDate() < 10 ? '0' + date1.getDate() : date1.getDate();

    let newDate = year + '-' + month + '-' + date;
    return newDate;
  };

  /**
   * @function filterDate
   * @description filter data by date or river names
   * @param {String} filter date or river_name
   * @param {String} value date value or river name list
   */
  const filterDate = (filter, value) => {
    console.log('filter: ' + filter + ': ' + value);
    if (filter === 'date') {
      setFilterType('date');
      setData(historyData.filter(item => item.newDate === value));
    }
    if (filter === 'riverName') {
      let searchedRivers = [];
      for (const val of value) {
        searchedRivers.push(
          historyData.filter(item => item.river_name === val)[0],
        );
      }
      setFilterType('river_name');
      setData(searchedRivers);
    }
  };

  /**
   * @function renderResults
   * @description render filtered result into screen
   *
   */
  const renderResults = () => {
    let type = [];
    type.push(<Text>results</Text>);

    if (filterType === 'All' && historyData.length > 0) {
      historyData.forEach(el => {
        type.push(
          <Button
            title={el.river_id.toString()}
            onPress={() => selectResult(el.river_id)}
          />,
        );
      });
    } else if (filterType !== 'All') {
      data.forEach(el => {
        type.push(
          <Button
            title={el.river_id.toString()}
            onPress={() => selectResult(el.river_id)}
          />,
        );
      });
    }
    return type;
  };

  /**
   * @function selectResult
   * @param {number} riverId
   * @description select river by id
   */
  const selectResult = riverId => {
    let select = historyData.filter(item => item.river_id === riverId);
    console.log(select);
  };

  /**
   * @function selectMatchItem
   * @param {String} keyWord
   * @description select matched rivers
   */
  const selectMatchItem = keyWord => {
    let resArr = [];
    riverNameList.filter(item => {
      if (item.toLowerCase().indexOf(keyWord.toLowerCase()) >= 0) {
        resArr.push(item);
      }
    });
    filterDate('riverName', resArr);
  };

  /**
   * @function getInput
   * @param {String} text
   * @description get input text value
   */
  const getInput = text => {
    setRiver(text);
  };

  //UI
  return (
    <SafeAreaView
      accessibilityLabel={testVariables.sampleHistoryScreenContainer}
      testID={testVariables.sampleHistoryScreenContainer}>
      <Text>SampleHistoryScreen!</Text>
      {/* FOR DATE */}
      <TouchableOpacity onPress={showDatepicker}>
        <Text>{formatDate(date)}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}
      {/* END OF DATE */}

      {/* {isLoading ? <ActivityIndicator /> : renderOptions()} */}

      <Text>search by river name!</Text>
      <TextInput
        placeholder="Insert river name"
        placeholderTextColor="#ff0000"
        onChangeText={text => getInput(text)}
        value={river}
      />
      <Button title="search" onPress={() => selectMatchItem(river)} />

      <Text>Results!</Text>
      {renderResults()}
    </SafeAreaView>
  );
};

export default SampleHistoryScreen;
