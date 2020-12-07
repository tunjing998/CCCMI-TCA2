import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import DetailsScreen from './DetailsScreen';
import InsectScreen from './InsectScreen';
import ArduinoScreen from './ArduinoScreen';

const DetailsStack = createStackNavigator();
const ArduinoStack = createStackNavigator();
const InsectStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Details" activeColor="#fff" shifting>
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
      component={ArduinoStackScreen}
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
      component={InsectStackScreen}
      options={{
        tabBarLabel: 'Insect',
        tabBarColor: '#e76f51',
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

const ArduinoStackScreen = ({navigation}) => (
  <ArduinoStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#694fad',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <ArduinoStack.Screen
      name="Arduino"
      component={ArduinoScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#694fad"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </ArduinoStack.Navigator>
);

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

const InsectStackScreen = ({navigation}) => (
  <InsectStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#e76f51',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <InsectStack.Screen
      name="Insect"
      component={InsectScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#e76f51"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </InsectStack.Navigator>
);