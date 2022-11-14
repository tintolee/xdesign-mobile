import {StyleSheet} from 'react-native';

import {verticalScale, scale} from 'react-native-size-matters';

export const useStyles = () => {
  const commonColors = {
    primary: '#215184',
  };

  const commonTheme = StyleSheet.create({
    primaryBackground: {
      backgroundColor: commonColors.primary,
    },

    overflowVisible: {
      overflow: 'visible',
    },
    headerLogo: {
      width: scale(128 * 1.2),
      height: scale(16 * 1.2),
      resizeMode: 'contain',
    },

    buttonText: {
      color: commonColors.primary,
    },
    bold: {
      fontWeight: '600',
      marginVertical: verticalScale(3),
    },
    lightWeight: {
      fontWeight: '300',
      fontSize: scale(11),
    },

    launchItemContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: scale(10),
      borderRadius: 10,
      backgroundColor: 'white',
      marginBottom: verticalScale(10),
    },
    launchItemMissionNameContainer: {
      flex: 1,
      justifyContent: 'center',
      marginLeft: scale(20),
    },
    launchItemDescriptionContainer: {
      alignItems: 'flex-end',
    },
    title: {
      fontSize: scale(30),
    },
  });

  const secondTheme = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: '#f3f2f7',
    },
    contentContainer: {
      flex: 1,
      padding: scale(15),
      backgroundColor: '#f3f2f7',
    },
    header: {
      borderBottomColor: 'rgba(0,0,0,.1)',
      borderBottomWidth: 1,
      paddingBottom: scale(10),
    },
    shadow: {
      shadowColor: 'rgba(0,0,0,.2)',
      shadowOffset: {width: -2, height: 3},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    text: {
      color: '#131313',
    },
    secondaryText: {
      color: '#888c99',
      fontSize: scale(10),
    },
    secondaryIcon: {
      color: '#838792',
      fontSize: scale(15),
    },
    containerBackground: {
      backgroundColor: 'white',
    },
    tabBar: {},
  });
  return {
    theme: {...commonTheme, ...secondTheme, commonColors},
  };
};
