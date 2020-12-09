import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import InsectScreen from './InsectScreen';
import ArduinoScreen from './ArduinoScreen';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    {/* <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    /> */}
    <Tab.Screen
      name="Details"
      component={DetailsStackScreen}
      options={{
        tabBarLabel: 'Details',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({color}) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Arduino"
      component={ArduinoScreen}
      options={{
        tabBarLabel: 'Arduino',
        tabBarColor: '#694fad',
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Insect"
      component={InsectScreen}
      options={{
        tabBarLabel: 'Insect',
        tabBarColor: '#d02860',
        tabBarIcon: ({color}) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

// const HomeStackScreen = ({navigation}) => (
//   <HomeStack.Navigator
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: '#009387',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }}>
//     <HomeStack.Screen
//       name="Home"
//       component={HomeScreen}
//       options={{
//         title: 'Overview',
//         headerLeft: () => (
//           <Icon.Button
//             name="ios-menu"
//             size={25}
//             backgroundColor="#009387"
//             onPress={() => navigation.openDrawer()}
//           />
//         ),
//       }}
//     />
//     {/* add screen here */}
//   </HomeStack.Navigator>
// );

const DetailsStackScreen = ({navigation}) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <DetailsStack.Screen
      name="Details"
      component={DetailsScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#1f65ff"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </DetailsStack.Navigator>
);
