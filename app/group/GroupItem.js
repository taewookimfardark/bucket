import React, {Component} from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

export default class GroupItem extends Component {
  render(){
    return(
      <TouchableOpacity style={{flex: 1, backgroundColor: 'red'}}>
        <Text>hohoho</Text>
      </TouchableOpacity>
    )
  }
}