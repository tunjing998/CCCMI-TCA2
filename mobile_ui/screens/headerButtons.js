import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export const HeaderButtons = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.icons}>
      <Icon
        style={{padding: 10}}
        name="user"
        size={30}
        onPress={() => navigation.push('Profile')}
      />
      <Icon
        style={{padding: 10}}
        name="cog"
        size={30}
        onPress={() => navigation.push('Settings')}
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
