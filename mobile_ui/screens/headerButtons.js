import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const HeaderButtons = ({navigation}) => {
  return (
    <View style={styles.icons}>
      <Icon
        style={{padding: 10}}
        name="user"
        size={30}
        onPress={() => alert('go to profile')}
      />
      <Icon
        style={{padding: 10}}
        name="cog"
        size={30}
        onPress={() => alert('go to settings')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    /* borderWidth: 2, */
    paddingRight: 10,
    paddingTop: 3,
  },
});
