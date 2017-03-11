import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Header extends Component {
  render(){
    return(
      <View style={{height: 64, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'grey', marginTop: 10}}>
        <Text>{this.props.headerName}</Text>
      </View>
    )
  }
}