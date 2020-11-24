import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthContext} from './context';

import {Home} from './screens/Home';
import {SignIn} from './screens/SignIn';
import {CreateAccount} from './screens/CreateAccount';
import {Profile} from './screens/Profile';
import {Settings} from './screens/Settings';
import {Splash} from './screens/Splash';

import {LocateRiver} from './screens/LocateRiver';
import {ChooseRiverScreen} from './screens/ChooseRiver';
import {ViewSample} from './screens/ViewSample';
import {RiverDetails} from './screens/RiverDetails';
import {Arduino} from './screens/Arduino';
import {Insects} from './screens/Insects';
import Icon from 'react-native-vector-icons/FontAwesome';
import {HeaderButtons} from './screens/headerButtons';

//sign in / create account
const AuthStack = createStackNavigator();
const GeneralStackScreen = ({navigation}) => (
  <AuthStack.Navigator initialRouteName="Home">
    <AuthStack.Screen name="Home" component={Home} />
    <AuthStack.Screen name="Profile" component={Profile} />
    <AuthStack.Screen name="Settings" component={Settings} />
    <AuthStack.Screen
      name="LocateRiver"
      component={LocateRiver}
      options={{title: 'Locate River'}}
    />
    <AuthStack.Screen
      name="ChooseRiver"
      component={ChooseRiverScreen}
      options={{title: 'Choose River'}}
    />
    <AuthStack.Screen
      name="RiverDetails"
      component={RiverDetailsStackScreen}
      options={({route}) => ({
        title: route.params.name,
        headerLeft: () => (
          <HeaderBackButton
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
        ),
        headerRight: () => <HeaderButtons />,
      })}
    />
    <AuthStack.Screen name="ViewSample" component={ViewSample} />
  </AuthStack.Navigator>
);

const AuthStackScreen = () => (
  <AuthStack.Navigator
    initialRouteName="SignIn"
    screenOptions={{
      headerShown: false,
    }}>
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

const RiverDetailsStack = createBottomTabNavigator();
export const RiverDetailsStackScreen = () => {
  return (
    <RiverDetailsStack.Navigator>
      <RiverDetailsStack.Screen
        name="RiverDetails"
        component={RiverDetails}
        options={{
          tabBarLabel: 'Details',
          tabBarIcon: ({color, size}) => (
            <Icon name="exclamation-triangle" size={size} color={color} />
          ),
        }}
      />
      <RiverDetailsStack.Screen
        name="Arduino"
        component={Arduino}
        options={{
          tabBarLabel: 'Arduino',
          tabBarIcon: ({color, size}) => (
            <Icon name="arrows" size={size} color={color} />
          ),
        }}
      />
      <RiverDetailsStack.Screen
        name="Insects"
        component={Insects}
        options={{
          tabBarLabel: 'Insects',
          tabBarIcon: ({color, size}) => (
            <Icon name="bug" size={size} color={color} />
          ),
        }}
      />
    </RiverDetailsStack.Navigator>
  );
};

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

const RootStack = createStackNavigator();
const RootStackScreen = ({userToken}) => (
  <RootStack.Navigator headerMode="none">
    {/* if user token exist, render drawer screen */}
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={GeneralStackScreen}
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
