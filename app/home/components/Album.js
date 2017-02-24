import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

export default class Album extends Component {
  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1, flexDirection: 'column'}}>
          <View style={{height: 300, width: 300, flexDirection: 'column', backgroundColor: 'red'}}>
            <View style={{height: 200, width: 100}}>
              <Text>hoho</Text>
            </View>
            <View style={{height: 200, width: 100}}>
              <Text>hoho</Text>
            </View>
            <View style={{height: 200, width: 100}}>
              <Text>hoho</Text>
            </View>
          </View>
          <View style={{flex: 2, flexDirection: 'row'}}>

          </View>
          <View style={{flex: 2, flexDirection: 'row'}}>

          </View>
          <View style={{flex: 2, flexDirection: 'row'}}>

          </View>
        </ScrollView>
      </View>
    )
  }
}