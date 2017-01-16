import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import NavigationBar from '../../general/NavigationBar';

export default class Profile extends Component {
  render() {
    return(
      <View style={{flex: 1}}>
        <NavigationBar backButton={()=>Actions.home()} completeButton={()=>Actions.home()}/>
        <View style={{flex: 1, margin: 15, backgroundColor: 'grey', opacity: 0.6, flexDirection: 'column'}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{borderRadius: 50, width: 90, height: 90}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}></Image>
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TextInput style={{width: 300}} placeholder="Nickname"/>
            </View>
            <View style={{flex: 3, margin: 10, backgroundColor: 'white', borderRadius: 10, flexDirection: 'column'}}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{flex: 2, textAlign: 'center'}}>Name</Text><TextInput style={{flex: 8, textAlignVertical: 'bottom'}} placeholder="Name"/>
              </View>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{flex: 2, textAlign: 'center'}}>Gender</Text><TextInput style={{flex: 8, textAlignVertical: 'bottom'}} placeholder="Gender"/>
              </View>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{flex: 2, textAlign: 'center'}}>E-mail</Text><TextInput style={{flex: 8, textAlignVertical: 'bottom'}} placeholder="E-mail"/>
              </View>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <TouchableOpacity style={{flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}><Text>Password</Text></TouchableOpacity>
            <TouchableOpacity style={{flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}><Text>Log out</Text></TouchableOpacity>
            <TouchableOpacity style={{flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}><Text>Destroy</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}