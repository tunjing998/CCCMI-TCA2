import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import {ListItem} from 'react-native-elements';

const ArduinoScreen2 = () => {
  const {colors} = useTheme();
  const theme = useTheme();

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

  return (
<View style={styles.listContainer}>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>Device ID</ListItem.Subtitle>
          <ListItem.Title style={styles.title}>WMD0001</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>Water Temperature</ListItem.Subtitle>
          <ListItem.Title style={styles.title}>14.23</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>pH Value</ListItem.Subtitle>
          <ListItem.Title style={styles.title}>6.70</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>Dissolved Oxygen</ListItem.Subtitle>
          <ListItem.Title style={styles.title}>11.5</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default ArduinoScreen2;
