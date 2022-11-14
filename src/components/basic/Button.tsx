import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import {useStyles} from '../../../utils/styles';

import {scale} from 'react-native-size-matters';
import Icon from 'react-native-ionicons';

interface Props {
  children: React.ReactNode;
  onPress: () => void;
  icon: string;
}
export const ActionButton = ({children, onPress, icon}: Props) => {
  const {theme} = useStyles();
  return (
    <TouchableOpacity onPress={onPress} style={[theme.primaryBackground, styles.buttonContainer]}>
      <Text style={styles.buttonText}>{children}</Text>
      <Icon name={icon} color="white" style={styles.buttonIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(7),
    marginLeft: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  buttonIcon: {
    fontSize: scale(15),
    marginLeft: scale(10),
  },
});
