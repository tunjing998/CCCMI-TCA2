import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';

const DetailsScreen = ({navigation}) => {
  const {colors} = useTheme();
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
          <ListItem.Subtitle style={styles.title}>River Name</ListItem.Subtitle>
          <ListItem.Title style={styles.title}>River Liffey</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>Latitude</ListItem.Subtitle>
          <ListItem.Title style={styles.title}>53.3492319</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>Longitude</ListItem.Subtitle>
          <ListItem.Title style={styles.title}>-6.535848</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>Area (km²)</ListItem.Subtitle>
          <ListItem.Title style={styles.title}>23.58</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>
            Length (km)
          </ListItem.Subtitle>
          <ListItem.Title style={styles.title}>14.51</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>
            Ecological Status
          </ListItem.Subtitle>
          <ListItem.Title style={styles.title}>Good</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>
            Local Authority
          </ListItem.Subtitle>
          <ListItem.Title style={styles.title}>
            Kildare County Council
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider containerStyle={styles.listContainer}>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.title}>
            Protected Area
          </ListItem.Subtitle>
          <ListItem.Title style={styles.title}>Yes</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default DetailsScreen;
