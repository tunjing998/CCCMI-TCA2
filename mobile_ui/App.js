import React from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
/* import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; */
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AuthContext} from './context';

import {Home} from './screens/Home';
import {SignIn} from './screens/SignIn';
import {CreateAccount} from './screens/CreateAccount';
import {Profile} from './screens/Profile';
import {Splash} from './screens/Splash';
import {Settings} from './screens/Settings';

import {Details} from './Screens';
import {LocateRiver} from './screens/LocateRiver';
import {ChooseRiverScreen} from './screens/ChooseRiver';

//sign in / create account
const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{title: 'Sign In'}}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{title: 'Create Account'}}
    />
  </AuthStack.Navigator>
);

/* const SearchStack = createStackNavigator(); */
const ProfileStack = createStackNavigator();

const RootStack = createStackNavigator();
const RootStackScreen = ({userToken}) => (
  <RootStack.Navigator headerMode="none">
    {/* if user token exist, render drawer screen */}
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      /* else, render authstack screen */
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

/* const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
  </Tabs.Navigator>
); */

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

//home
const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="ChooseRiverStackScreen"
      component={ChooseRiverStackScreen}
    />
  </HomeStack.Navigator>
);

/* const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
); */

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomeStackScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
    <Drawer.Screen name="Settings" component={Settings} />
  </Drawer.Navigator>
);

//Choose River Stack
const ChooseRiver = createStackNavigator();
const ChooseRiverStackScreen = () => (
  <ChooseRiver.Navigator>
    <ChooseRiver.Screen name="Locate River" component={LocateRiver} />
    <ChooseRiver.Screen name="Choose River" component={ChooseRiverScreen} />
  </ChooseRiver.Navigator>
);

//render based on usertoken
export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  // store signin, signup, signout function
  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken('asdf');
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('asdf');
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
