import React from 'react';
import {View, Text} from 'react-native';

import {Launch} from '../../../types/types';

import moment from 'moment';
import {useStyles} from '../../../utils/styles';

export const LaunchItem = ({launch}: {launch: Launch}) => {
  const {theme} = useStyles();

  return (
    <View style={[theme.launchItemContainer, theme.shadow]}>
      <View>
        <Text>#{launch.index}</Text>
      </View>
      <View style={theme.launchItemMissionNameContainer}>
        <Text>{launch.missionName}</Text>
      </View>
      <View style={theme.launchItemDescriptionContainer}>
        <Text>{moment(launch.launchDate).format('Do MMM yyyy')}</Text>
        <Text>{launch.rocketName}</Text>
      </View>
    </View>
  );
};
