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
      <View style={{height: 44, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'grey', paddingTop: 10}}>
        <Text>{this.props.headerName}</Text>
      </View>
    )
  }
}