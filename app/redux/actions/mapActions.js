/* eslint-disable no-undef */
import {
  GET_SEARCH_REQUEST_FAIL,
  GET_SEARCH_REQUEST_START,
  GET_SEARCH_REQUEST_SUCCESS,
} from './types';
import {searchURL} from '../../../app/constants/apiURL';
import {API_KEY} from '../../constants/apiURL';
import {Alert} from 'react-native';

const getSearchRequestStart = () => {
  return {
    type: GET_SEARCH_REQUEST_START,
  };
};

const getSearchRequestSuccess = (response) => {
  return {
    type: GET_SEARCH_REQUEST_SUCCESS,
    payload: {
      searchResponse: response,
    },
  };
};

const getSearchRequestFail = (errorMessage) => {
  return {
    type: GET_SEARCH_REQUEST_FAIL,
    payload: {
      apiErrorMessage: errorMessage,
    },
  };
};

export const executeGetSearchRequest = (city) => {
  return async (dispatch, getState) => {
    dispatch(getSearchRequestStart());
    const url = searchURL
      .replace('{{city}}', city)
      .replace('{{apiKey}}', API_KEY);
    const options = {
      method: 'GET',
    };
    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          if (response.cod && response.cod === '200') {
            dispatch(getSearchRequestSuccess(response));
          } else {
            Alert.alert(
              'Error!',
              response.message
                ? response.message
                : 'Some thing went wrong: Error Code 3',
            );
            dispatch(
              getSearchRequestFail(
                response.message
                  ? response.message
                  : 'Some thing went wrong: Error Code 3',
              ),
            );
          }
        } else {
          dispatch(getSearchRequestFail('Some thing went wrong: Error Code 2'));
        }
      })
      .catch((error) => {
        dispatch(getSearchRequestFail('Some thing went wrong: Error Code 1'));
      });
  };
};

export default {
  executeGetSearchRequest,
};
