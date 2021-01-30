import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem, Button, Text} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import testVariables from '../appium_automation_testing/test_variables';
import {FlatList} from 'react-native-gesture-handler';
import {List} from 'native-base';

const SearchRiverScreen2 = ({navigation, route}) => {
  const {colors} = useTheme();
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
    h3title: {
      color: colors.text,
      textAlign: 'center',
    },
  });

  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.riverDetailContainer}
      testID={testVariables.riverDetailContainer}>
      <View>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Name
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.data.river_name}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>Latitude</ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.data.latitude}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Longitude
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.data.longitude}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Catchments
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.data.river_catchments}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              River Code
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.data.river_code}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Local Authority
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.data.local_authority}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider containerStyle={styles.listContainer}>
          <ListItem.Content>
            <ListItem.Subtitle style={styles.title}>
              Transboundary
            </ListItem.Subtitle>
            <ListItem.Title style={styles.title}>
              {route.params.data.transboundary}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
      <Button
        accessibilityLabel={testVariables.riverDetailChooseRiverButton}
        testID={testVariables.riverDetailChooseRiverButton}
        title="Choose this river"
        onPress={() => navigation.navigate('MainTabScreen')}
        ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
          colors: ['#4c4cff', '#6666ff'],
          start: {x: 0, y: 0},
          end: {x: 1, y: 0},
        }}
      />
      {console.log(route.params.data.canal)}
    </View>
  );
};

export default SearchRiverScreen2;
