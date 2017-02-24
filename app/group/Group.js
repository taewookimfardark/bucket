import React, {Component} from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  NativeModules
} from 'react-native';

import Header from '../general/Header';

import colors from '../general/colors';

import {Actions} from 'react-native-router-flux';



export default class Group extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      images: null
    }
  }

  render(){
    return(
      <View style={{flex: 1, alignItems: 'center'}}>
        <Header headerName="My Groups"/>
        <TouchableOpacity style={{height: 200, width: 200, backgroundColor: colors.colorBucket}}
                          onPress={(e)=> Actions.tabbar()}>
          <Text>Group</Text>
        </TouchableOpacity>
      </View>
    )
  }
}