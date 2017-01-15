import React, {Component} from 'react';
import {Provider} from 'react-redux';
import App from './App';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableHighlight
} from 'react-native';

import store from './store/index';

export default class BucketApp extends Component {
  render(){
    return(
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}