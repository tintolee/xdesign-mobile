import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {HomeStack} from '../stack/MainStack';

export const HomeNavigator = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};
