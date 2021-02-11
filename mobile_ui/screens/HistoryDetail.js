import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ListItem, Icon} from 'react-native-elements';
import testVariables from '../appium_automation_testing/test_variables';

const HistoryDetail = ({route}) => {
  const {colors} = useTheme();
  const {item} = route.params;
  const [insectsList, setInsectsList] = useState([]);
  const url = 'http://cccmi-aquality.tk/aquality_server/sampledetail';
  var bodyFormData = new FormData();
  bodyFormData.append('sample_id', item.sample_id);

  useEffect(() => {
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: bodyFormData, // data can be `string` or {object}!
      headers: new Headers({
        'Content-Type': 'multipart/form-data',
      }),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(json => setInsectsList(json.insect_list))
      .catch(error => console.error('Error:', error));
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: colors.text,
    },
    listContainer: {
      backgroundColor: colors.background,
    },
  });

  const renderInsects = () => {
    console.log('renderInsects');
    insectsList && console.log(insectsList);
  };
  return (
    <View
      style={styles.listContainer}
      accessibilityLabel={testVariables.historyDetailContainer}
      testID={testVariables.historyDetailContainer}>
      <ScrollView>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Sample Score
            </ListItem.Subtitle>
            <Text style={styles.title}>{item.sample_score}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>Date</ListItem.Subtitle>
            <Text style={styles.title}>{item.newDate}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>Water pH</ListItem.Subtitle>
            <Text style={styles.title}>{item.sample_ph}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Water Temperature
            </ListItem.Subtitle>
            <Text style={styles.title}>{item.sample_tmp}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Sample taken by
            </ListItem.Subtitle>
            <Text style={styles.title}>{item.sample_user}</Text>
          </ListItem.Content>
        </ListItem>
        {insectsList &&
          insectsList.map(item => {
            return (
              <View>
                <Text>{item.sample_record_insect}</Text>
                <Text>{item.insect_number}</Text>
              </View>
            );
          })}
      </ScrollView>
      {renderInsects()}
    </View>
  );
};

export default HistoryDetail;
