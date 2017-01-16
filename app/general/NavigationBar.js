import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';

export default class NavigationBar extends Component {
  render() {
    return(
      <View style={{height: 64, alignItems: 'center', flexDirection: 'row', justifyContent:'space-between', backgroundColor: 'red'}}>
        <TouchableOpacity onPress={()=> this.props.backButton()}><Text>Back</Text></TouchableOpacity>
        <Text>{this.props.title}</Text>
        <TouchableOpacity onPress={()=> this.props.completeButton()}><Text>Complete</Text></TouchableOpacity>
      </View>
    )
  }
}