import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Button, SearchBar} from 'react-native-elements';
import testVariables from '../appium_automation_testing/test_variables';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';

let riverNameList = [];
let dateList = [];
let historyData = [];
let url = 'http://cccmi-aquality.tk/aquality_server/samplerecord/?username=';

/**
 * @param {*} {navigation}
 * @description Sample History Screen component
 * @return {SampleHistoryScreen}
 */
const SampleHistoryScreen = ({navigation}) => {
  const {colors} = useTheme();
  const userName = 'kobe24';
  const [isLoading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [data, setData] = useState([]);
  // const [historyData, setHistoryData] = useState([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
    },
    button: {
      width: 200,
      marginVertical: 10,
      backgroundColor: '#4c4cff',
      padding: 5,
      borderRadius: 50,
    },
    btnText: {
      color: 'white',
      fontSize: 20,
      justifyContent: 'center',
      textAlign: 'center',
    },
    searchContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    riverNameInput: {
      width: '80%',
      textAlign: 'center',
      marginTop: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    resultButton: {
      marginTop: 5,
    },
    resultsContainer: {
      marginTop: 40,
    },
  });

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

  /**
   * @description life hook
   */
  useEffect(() => {
    fetch(url + userName)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(json => {
        historyData = json;
      })
      .then(() => convertDate())
      .then(() => setValues())
      .then(() => setLoading(false))
      .catch(error => alert(error));
  }, []);

  /**
   * @function convertDate
   * @description convert fetched data into local data list,
   *              add a new filed called newDate.
   *
   */
  const convertDate = () => {
    for (const el of historyData) {
      if (el.sample_date) {
        el.newDate = reconstructDate(el.sample_date);
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
      riverNameList.push(ele.sample_river.river_name);
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
    let searchedRivers = [];
    if (filter === 'date') {
      setFilterType('date');
      searchedRivers = historyData.filter(item => item.newDate === value);
    } else {
      for (const val of value) {
        searchedRivers.push(
          historyData.filter(item => item.sample_river.river_name === val)[0],
        );
      }
      setFilterType('river_name');
    }
    setData(searchedRivers);
  };

  /**
   * @function unique
   * @description get unique river object
   * @param {Array} rivers
   * @param {String} filed
   */
  const unique = rivers => {
    let result = {};
    let finalResult = [];

    for (let i = 0; i < rivers.length; i++) {
      result[rivers[i].sample_river.river_name] = rivers[i].sample_river;
    }

    for (let item in result) {
      finalResult.push(result[item]);
    }
    return finalResult;
  };

  /**
   * @function renderResults
   * @description render filtered result into screen
   *
   */
  const renderResults = () => {
    let type = [];
    type.push(<Text style={{fontSize: 30}}>Results</Text>);
    let riversNotRepeat = [];
    if (filterType === 'All' && historyData.length > 0) {
      riversNotRepeat = unique(historyData);
    } else {
      riversNotRepeat = unique(data);
    }

    riversNotRepeat.forEach(el => {
      type.push(
        <Button
          title={el.river_name.toString()}
          onPress={() => selectResult(el.river_id)}
          buttonStyle={styles.resultButton}
          type="outline"
          key={el.river_id}
          ViewComponent={LinearGradient} // Don't forget this!
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
        />,
      );
    });

    return type;
  };
  /**
   * @function selectResult
   * @param {number} riverId
   * @description select river by id
   */
  const selectResult = riverId => {
    let select = [];
    if (filterType === 'date') {
      select = historyData.filter(item => {
        if (
          item.sample_river.river_id === riverId &&
          reconstructDate(item.sample_date) == reconstructDate(date)
        )
          return item;
      });
    } else {
      select = historyData.filter(
        item => item.sample_river.river_id === riverId,
      );
    }

    navigation.navigate('HistoryList', {data: select});
  };

  /**
   * @function selectMatchItem
   * @param {String} keyWord
   * @description select matched rivers
   */
  const selectMatchItem = keyWord => {
    let resArr = [];
    keyWord &&
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
      <View style={styles.searchContainer}>
        {/* FOR DATE */}
        <Text style={styles.searchTitle}>Sort by date</Text>
        <TouchableOpacity onPress={showDatepicker} style={styles.button}>
          <Text style={styles.btnText}>{formatDate(date)}</Text>
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

        <Text style={styles.searchTitle}>Search by river name</Text>
        <View style={styles.inputContainer}>
          {/* <TextInput
            placeholder="River Name"
            placeholderTextColor="#999999"
            onChangeText={text => getInput(text)}
            value={river}
            style={styles.riverNameInput}
          /> */}
          <SearchBar
            placeholder="e.g. River Liffey"
            onChangeText={text => getInput(text)}
            value={river}
            containerStyle={styles.riverNameInput}
            lightTheme={true}
            searchIcon={
              <Icon.Button
                accessibilityLabel={testVariables.searchRiverSearchIcon}
                testID={testVariables.searchRiverSearchIcon}
                style={styles.searchIcon}
                name="magnify"
                backgroundColor="transparent"
                size={20}
                color="#000"
                onPress={() => selectMatchItem(river)}
              />
            }
          />
          {/* <Button title="search" onPress={() => selectMatchItem(river)} /> */}
          {/* <Icon.Button
            accessibilityLabel={testVariables.searchRiverSearchIcon}
            testID={testVariables.searchRiverSearchIcon}
            style={styles.searchIcon}
            name="magnify"
            backgroundColor="transparent"
            size={20}
            color="#000"
            onPress={() => selectMatchItem(river)}
          /> */}
        </View>
        <ScrollView style={styles.resultsContainer}>
          {renderResults()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SampleHistoryScreen;
