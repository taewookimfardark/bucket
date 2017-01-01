import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import ViewPager from 'react-native-viewpager';


export default class Main extends Component {
  render() {
    return(
      <View>
        <View style={{
          height: 40,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <TouchableHighlight style={{width: 60, alignItems: 'center'}}>
            <Text>Albume</Text>
          </TouchableHighlight>
          <TouchableHighlight style={{width: 60, alignItems: 'center'}}>
            <Text>Home</Text>
          </TouchableHighlight>
          <TouchableHighlight style={{width: 60, alignItems: 'center'}}>
            <Text>Inbox</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}