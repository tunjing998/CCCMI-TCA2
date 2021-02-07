import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ListItem, Icon } from 'react-native-elements';

const HistoryList = ({navigation, route }) => {
  const { colors } = useTheme();
  const { data } = route.params;

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
    <View>
      {
        data.map((item, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => {
              navigation.navigate('HistoryDetail', {item})
            }}>
            <Icon name={item.icon} />
            <ListItem.Content>
              <ListItem.Title>Sample ID: {item.sample_id}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
    </View>
  );
};

export default HistoryList;
