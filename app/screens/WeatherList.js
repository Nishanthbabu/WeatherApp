import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import mapActions from '../redux/actions/mapActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Text} from 'react-native-elements';

const WeatherList = ({navigation, searchResponse, route}) => {
  const onListItemClick = (item) => {
    navigation.navigate('WeatherDetails', {
      weatherData: item,
      name: route.params.name,
    });
  };

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'gray',
        height: 0.5,
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={
          searchResponse &&
          searchResponse.list &&
          Array.isArray(searchResponse.list)
            ? searchResponse.list
            : []
        }
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              width: '100%',
              height: 60,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => onListItemClick(item)}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>
                {item &&
                item.weather &&
                Array.isArray(item.weather) &&
                item.weather.length &&
                item.weather[0]
                  ? item.weather[0].main
                  : 'NA'}
              </Text>
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>
                Temp{' '}
                {item && item.main && item.main.temp ? item.main.temp : 'NA'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={renderSeparator}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#c3c3c3'},
});

const mapStateToProps = ({mapReducer}) => {
  return {...mapReducer};
};
const mapDispatchToProps = (dispatch) => {
  const allActions = {...mapActions};
  return {...bindActionCreators(allActions, dispatch)};
};
const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WeatherList);
export default ConnectedComponent;
