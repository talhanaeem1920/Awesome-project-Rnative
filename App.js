/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import isEqual from 'lodash/isEqual';

const Stack = createStackNavigator();
export const AuthContext = createContext();

const App = () => {
  const restoreToken = async () => {
    let Token;
    try {
      Token = await AsyncStorage.getItem('userToken');
    } catch (e) {
      console.log(e);
    }
    console.log(Token, 'local storage token');
    if (Token) {
      return Token;
    } else {
      return null;
    }
  };

  const [userToken, setuserToken] = useState(null);

  const authContext = (value) => {
    setuserToken(value);
  };

  useEffect(() => {
    setuserToken(restoreToken());
    console.log(userToken);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Signup"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#3740FE',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          {console.log(userToken)}
          {userToken === null ? (
            <>
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{title: 'Signup'}}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={({title: 'Login'}, {headerLeft: null})}
              />
            </>
          ) : (
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={({title: 'Dashboard'}, {headerLeft: null})}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
