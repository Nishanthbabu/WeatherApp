import React from 'react';
import {Alert, SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import mapActions from '../redux/actions/mapActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';

const CityNameInputScreen = ({navigation, executeGetSearchRequest}) => {
  const [cityTextState, setCityTextState] = React.useState('');

  const updateSearch = (text) => {
    setCityTextState(text);
  };

  const onSubmit = async () => {
    if (cityTextState && cityTextState !== '') {
      const response = await executeGetSearchRequest(cityTextState);
      if (response) {
        navigation.navigate('WeatherList', {name: cityTextState});
      }
    } else {
      Alert.alert('Alert!', 'Please enter city name');
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.container2}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(text) => updateSearch(text)}
            value={cityTextState}
            placeholder="City Name"
          />
          <Button
            title="Search"
            type="outline"
            onPress={onSubmit}
            style={{padding: 16}}
            buttonStyle={{borderColor: 'gray'}}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#c3c3c3',
  },
  container2: {
    padding: 30,
    width: '100%',
  },
  inputStyle: {
    height: 50,
    width: '100%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
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
)(CityNameInputScreen);
export default ConnectedComponent;
