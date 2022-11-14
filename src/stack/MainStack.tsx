import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';

import {Image} from 'react-native';
import {useStyles} from '../../utils/styles';

const Stack = createStackNavigator();

export const HomeStack = () => {
  const {theme} = useStyles();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <Image style={theme.headerLogo} source={require('../../assets/images/logo.png')} />,
        }}
      />
    </Stack.Navigator>
  );
};
