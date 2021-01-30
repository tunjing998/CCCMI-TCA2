import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';

const HistoryDetail = ({route}) => {
  return (
    <View>
      {/* <Text>{route.params.data}</Text> */}
      <FlatList
        data={route.params.data}
        keyExtractor={item => item.river_id}
        renderItem={({item}) => (
          <View>
            <Text>{item.date}</Text>
            <Text />
            <Text>{item.river_id}</Text>
            <Text>{item.latitude}</Text>
            <Text>{item.longitude}</Text>
            <Text>{item.local_authority}</Text>
            <Text />
            <Text />
            <Text>{item.ph}</Text>
            <Text>{item.newDate}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HistoryDetail;
