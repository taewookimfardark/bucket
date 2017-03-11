import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class NavigationBar extends Component {
  render() {
    return(
      <View style={{height: 64, alignItems: 'center', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', paddingHorizontal: 10, marginTop: 10,
                    borderBottomWidth: 0.5, borderBottomColor: 'rgba(128, 128, 128, 0.7)'}}>
        <TouchableOpacity onPress={()=> this.props.backButton()} style={{width: 60}}>
          <Icon size={32} name="ios-arrow-back" color="grey"/>
        </TouchableOpacity>
        <Text>{this.props.title}</Text>
        <TouchableOpacity style={{width: 60}} onPress={()=> this.props.completeButton()}>
          <Text>Confirm</Text>
        </TouchableOpacity>
      </View>
    )
  }
}