import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';

export default class NavigationBar extends Component {
  render() {
    return(
      <View style={{height: 64, alignItems: 'center', flexDirection: 'row', justifyContent:'space-between',
                    borderBottomWidth: 0.5, borderBottomColor: 'rgba(128, 128, 128, 0.7)'}}>
        <TouchableOpacity onPress={()=> this.props.backButton()}>
        </TouchableOpacity>
        <Text>{this.props.title}</Text>
        <TouchableOpacity onPress={()=> this.props.completeButton()}><Text>Complete</Text></TouchableOpacity>
      </View>
    )
  }
}