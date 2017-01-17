import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import NavigationBar from '../../general/NavigationBar';

export default class EditPassword extends Component {
  render() {
    return(
      <View style={{flex: 1, backgroundColor: 'grey'}}>
        <NavigationBar title="Edit Password" backButton={()=>Actions.pop()} completeButton={()=>Actions.pop()}/>
        <View style={{height: 400, flexDirection: 'column'}}>
          <View style={{flex: 1, margin: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'}}>
            <Text style={{flex: 2, textAlign: 'center'}}>Current</Text><TextInput style={{flex: 8, textAlignVertical: 'bottom'}} placeholder="Name"/>
          </View>
          <View style={{flex: 2, margin: 10}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'}}>
              <Text style={{flex: 2, textAlign: 'center'}}>New</Text><TextInput style={{flex: 8, textAlignVertical: 'bottom'}} placeholder="Name"/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'}}>
              <Text style={{flex: 2, textAlign: 'center'}}>Confirm</Text><TextInput style={{flex: 8, textAlignVertical: 'bottom'}} placeholder="Gender"/>
            </View>
          </View>
        </View>
      </View>
    )
  }
}