/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import {SafeAreaView, View, FlatList, StyleSheet, RefreshControl} from 'react-native';

import {LaunchItem} from '../components/basic/LaunchItem';
import {ActionButton} from '../components/basic/Button';
import {Picker} from '@react-native-picker/picker';

import {Launch} from '../../types/types';

import {verticalScale, scale} from 'react-native-size-matters';
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';

import {useApi} from '../../API/Api';
import * as Endpoint from '../../API/Endpoints';
import {useStyles} from '../../utils/styles';

export const HomeScreen = () => {
  const {theme} = useStyles();

  const Api = useApi();

  const [refreshing, setRefreshing] = React.useState(false);
  const [launches, setLaunches] = React.useState<Launch[]>([]);

  const [isSortAscending, setIsSortAscending] = React.useState<boolean>(true);
  const [page, setPage] = React.useState<number>(0);
  const NUMBER_OF_LAUNCHES_TO_FETCH_AT_A_TIME = 10;

  const [yearFilter, setYearFilter] = React.useState<number | null>(null);
  const [yearFilterPickerOpen, setYearFilterPickerOpen] = React.useState(false);
  const pickerRef = React.useRef<any>();

  const getLaunches = async (_page: number, reset?: boolean, order?: boolean, year?: number | null) => {
    try {
      if (reset) {
        setLaunches([]);
        setPage(0);
      }

      const response = await Api.call(Endpoint.LAUNCHES, [
        NUMBER_OF_LAUNCHES_TO_FETCH_AT_A_TIME,
        _page * NUMBER_OF_LAUNCHES_TO_FETCH_AT_A_TIME,
        order ?? isSortAscending ? 'asc' : 'desc',
        (year === undefined ? yearFilter : year) ?? '',
      ]);

      const _launches: [Launch] = response.data.map(({mission_name, launch_date_utc, rocket, flight_number}: any) => {
        return {
          index: flight_number,
          missionName: mission_name,
          launchDate: launch_date_utc,
          rocketName: rocket.rocket_name,
          id: uuidv4(),
        };
      });

      // Rerendering this component will cause items to duplicate
      setLaunches(_previousState =>
        _previousState === _launches ? _previousState : [..._previousState, ..._launches],
      );
    } catch (e) {
      console.error(e);
    }
  };

  const setOrder = async () => {
    // Race case, if we set the state then getLaunches, the setting of the state might not have completed before we retreive launches
    // So we pass the new value as a parameter and set it later.
    await getLaunches(0, true, !isSortAscending);
    setIsSortAscending(!isSortAscending);
  };

  const filterByYear = async (year: number | null) => {
    await getLaunches(0, true, isSortAscending, year);
    setYearFilterPickerOpen(false);
    setYearFilter(year);
  };

  const loadMoreData = () => {
    getLaunches(page + 1);
    setPage(page + 1);
  };

  const refetchData = async () => {
    setRefreshing(true);
    await getLaunches(0, true);
    setRefreshing(false);
  };

  React.useEffect(() => {
    getLaunches(page);
  }, []);

  return (
    <SafeAreaView style={theme.safeAreaView}>
      <View style={[theme.contentContainer, styles.noPadding]}>
        <View style={styles.actionButtonContainer}>
          <ActionButton icon="ios-arrow-down" onPress={() => setYearFilterPickerOpen(true)}>
            Filter by Year {yearFilter ? `(${yearFilter})` : ''}
          </ActionButton>
          <ActionButton onPress={setOrder} icon="ios-swap">
            Sort {isSortAscending ? 'Descending' : 'Ascending'}
          </ActionButton>
        </View>
        <FlatList
          keyExtractor={(item: Launch) => item.id}
          data={launches}
          style={styles.flatList}
          renderItem={({item}) => <LaunchItem launch={item} key={item.id} />}
          onEndReached={loadMoreData}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetchData} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {yearFilterPickerOpen && (
        <Picker selectedValue={yearFilter} onValueChange={value => filterByYear(value)} ref={pickerRef}>
          <Picker.Item label="All" value={null} />
          {_.range(2006, 2021).map((value: number, key) => (
            <Picker.Item label={value.toString()} value={value} key={key} />
          ))}
        </Picker>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actionButtonContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    padding: scale(10),
    marginTop: verticalScale(5),
  },
  advanceActionButtonContainer: {
    marginTop: 0,
    paddingTop: 0,
  },
  noPadding: {
    padding: 0,
  },
  flatList: {
    padding: scale(10),
  },
});
