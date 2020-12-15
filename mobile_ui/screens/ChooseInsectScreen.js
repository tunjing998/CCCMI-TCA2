import React from 'react';
import {StyleSheet} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {List, Avatar} from 'react-native-paper';

const ChooseInsectScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  // List of Insect group
  const group1 = [
    {
      name: 'Caenis',
      avatar_url: require('../assets/insects/caenis.jpg'),
    },
    {
      name: 'Ecdyonurus',
      avatar_url: require('../assets/insects/ecdyonurus.jpg'),
    },
    {
      name: 'Ephemera Danica',
      avatar_url: require('../assets/insects/Ephemera_Danica.jpg'),
    },
    {
      name: 'Heptagenia',
      avatar_url: require('../assets/insects/Heptagenia.jpg'),
    },
    {
      name: 'Rhithrogena',
      avatar_url: require('../assets/insects/Rhithrogena.jpg'),
    },
    {
      name: 'Serratella Ignita',
      avatar_url: require('../assets/insects/Serratella_Ignita.jpg'),
    },
  ];

  const group2 = [
    {
      name: 'Hydropsychidae',
      avatar_url: require('../assets/insects/Hydropsychidae.jpg'),
    },
    {
      name: 'Leptoceridae',
      avatar_url: require('../assets/insects/Leptoceridae.jpg'),
    },
    {
      name: 'Limnephilidae',
      avatar_url: require('../assets/insects/Limnephilidae.jpg'),
    },
    {
      name: 'Rhyacophila',
      avatar_url: require('../assets/insects/Rhyacophila.jpg'),
    },
  ];

  return (
    <ScrollView>
      <List.Subheader>Group 1 - Mayflies</List.Subheader>
      <FlatList
        data={group1}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <List.Item
            title={item.name}
            left={() => <Avatar.Image source={item.avatar_url} />}
            right={props => (
              <List.Icon {...props} icon="checkbox-blank-circle-outline" />
            )}
          />
        )}
      />
      <List.Subheader>Group 2 - Caddiesflies</List.Subheader>
      <FlatList
        data={group2}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <List.Item
            title={item.name}
            left={() => <Avatar.Image source={item.avatar_url} />}
            right={props => (
              <List.Icon {...props} icon="checkbox-blank-circle-outline" />
            )}
          />
        )}
      />
    </ScrollView>
  );
};

export default ChooseInsectScreen;
