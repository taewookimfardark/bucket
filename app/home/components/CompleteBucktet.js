import React, {Component} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';

import {Actions} from 'react-native-router-flux';

export default class CompleteBucket extends Component {

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{height: 64, alignItems: 'center', flexDirection: 'row', justifyContent:'space-between', backgroundColor: 'red'}}>
          <TouchableOpacity onPress={()=> Actions.pop()}><Text>Back</Text></TouchableOpacity>
          <Text>Bucket Complete</Text>
          <Text>Complete</Text>
        </View>
        <View style={{flex: 1, backgroundColor: 'green', flexDirection: 'column'}}>
          <Image style={{flex: 2, borderRadius: 10, margin: 10}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
          <View style={{flex: 1, backgroundColor: 'blue', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <Image style={{height: 30, width: 30, borderRadius: 50}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}></Image>
            <Text>Date</Text>
            <Image style={{height: 30, width: 30, borderRadius: 50}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}></Image>
          </View>
          <TextInput style={{flex: 4, backgroundColor: 'lime'}} multiline={true}   placeholder="Complete bucket"/>
        </View>
      </View>
    )
  }
}

