import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ListItem, Icon } from 'react-native-elements';

const HistoryDetail = ({ route }) => {
  const { colors } = useTheme();
  const { item } = route.params;

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
          <ListItem.Subtitle style={styles.title}>
            Sample Score
            </ListItem.Subtitle>
          <Text style={styles.title}>
            {item.sample_score}
          </Text>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>
            Data
            </ListItem.Subtitle>
          <Text style={styles.title}>
            {item.newDate}
          </Text>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>
            Water pH
            </ListItem.Subtitle>
          <Text style={styles.title}>
            {item.sample_ph}
          </Text>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>
            Water Temperature
            </ListItem.Subtitle>
          <Text style={styles.title}>
            {item.sample_tmp}
          </Text>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>
            Sample taken by
            </ListItem.Subtitle>
          <Text style={styles.title}>
            {item.sample_user}
          </Text>
        </ListItem.Content>
      </ListItem>
    </View>

  );
};

export default HistoryDetail;
