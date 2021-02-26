import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import mapActions from '../redux/actions/mapActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Text} from 'react-native-elements';

const WeatherDetails = ({navigation, route, searchResponse}) => {
  const {weatherData} = route.params;
  console.log('mmmmmm-----weatherData-----', weatherData);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 0.4,
          alignItems: 'center',
          justifyContent: 'center',
          paddingStart: 10,
          paddingEnd: 10,
        }}>
        <Text style={{fontSize: 34, fontWeight: 'bold'}}>
          {weatherData && weatherData.main && weatherData.main.temp
            ? weatherData.main.temp
            : 'NA'}
        </Text>
        <Text
          style={{
            fontSize: 16,
            alignSelf: 'flex-end',
            paddingEnd: 20,
            paddingTop: 10,
          }}>
          Feels Like:{' '}
          {weatherData && weatherData.main && weatherData.main.feels_like
            ? weatherData.main.feels_like
            : 'NA'}
        </Text>
      </View>
      <View style={{flex: 0.6, paddingStart: 10, paddingEnd: 10}}>
        <Text style={{fontSize: 24, marginTop: 10}}>
          {weatherData &&
          weatherData.weather &&
          Array.isArray(weatherData.weather) &&
          weatherData.weather.length &&
          weatherData.weather[0] &&
          weatherData.weather[0].main
            ? weatherData.weather[0].main
            : 'NA'}
        </Text>
        <Text style={{fontSize: 24, marginTop: 10}}>
          {weatherData &&
          weatherData.weather &&
          Array.isArray(weatherData.weather) &&
          weatherData.weather.length &&
          weatherData.weather[0] &&
          weatherData.weather[0].description
            ? weatherData.weather[0].description
            : 'NA'}
        </Text>
      </View>
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
)(WeatherDetails);
export default ConnectedComponent;
