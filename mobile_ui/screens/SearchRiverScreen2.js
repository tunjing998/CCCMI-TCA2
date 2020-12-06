import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Subheading, Caption, Title} from 'react-native-paper';

const SearchRiverScreen2 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>SearchRiverScreen2</Text>
      <Text>Display chosen river details here ( FROM API )</Text>
      <View style={{flexDirection: 'column'}}>
        <Title style={{textAlign: 'center'}}>Stream Liffey</Title>
        <Subheading style={styles.title}>Name</Subheading>
        <Caption style={styles.caption}>Stream Liffey</Caption>
        <Subheading style={styles.title}>Latitude</Subheading>
        <Caption style={styles.caption}>53.3492319</Caption>
        <Subheading style={styles.title}>Longitude</Subheading>
        <Caption style={styles.caption}>-6.535848</Caption>
        <Subheading style={styles.title}>Area (km²)</Subheading>
        <Caption style={styles.caption}>23.58</Caption>
        <Subheading style={styles.title}>Length (km)</Subheading>
        <Caption style={styles.caption}>15.41</Caption>
        <Subheading style={styles.title}>Ecological Status</Subheading>
        <Caption style={styles.caption}>Good</Caption>
      </View>
      <Button
        title="Choose this river"
        onPress={() => navigation.navigate('MainTabScreen')}
      />
    </View>
  );
};

export default SearchRiverScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
