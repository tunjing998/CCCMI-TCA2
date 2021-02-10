import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ListItem, Icon} from 'react-native-elements';
import testVariables from '../appium_automation_testing/test_variables';

const HistoryDetail = ({route}) => {
  const {colors} = useTheme();
  const {item} = route.params;

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

  const [sample_item, setSampleItem] = useState({});

  const url =
    'http://cccmi-aquality.tk/aquality_server/sampledetail?sample_id=';
  useEffect(
    fetch(url + item.sample_id).then(response => console.log(response.json())),
  );

  console.log(item.sample_id);
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
      </ScrollView>
    </View>
  );
};

export default HistoryDetail;
