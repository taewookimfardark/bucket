import React, {Component} from 'react';
import {Provider} from 'react-redux';
import NavigationRootContainer from './general/navigation/NavigationRootContainer'
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
        <NavigationRootContainer/>
      </Provider>
    )
  }
}