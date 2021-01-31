import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';

const HistoryDetail = ({route}) => {
  return (
    <View>
      {/* <Text>{route.params.data}</Text> */}
      <FlatList
        data={route.params.data}
        keyExtractor={item => item.sample_river.river_id}
        renderItem={({item}) => (
          <View>
            <Text>{item.date}</Text>
            <Text />
            <Text>{item.sample_river.river_id}</Text>
            <Text>{item.sample_river.latitude}</Text>
            <Text>{item.sample_river.longitude}</Text>
            <Text>{item.sample_river.local_authority}</Text>
            <Text />
            <Text />
            <Text>{item.sample_ph}</Text>
            <Text>{item.newDate}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HistoryDetail;
