import React, {Component} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import NavigationBar from '../../general/NavigationBar';

import {Actions} from 'react-native-router-flux';

export default class CompleteBucket extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <NavigationBar title="Complete Bucket" backButton={()=>Actions.pop()} completeButton={()=>Actions.pop()}/>
        <View style={{flex: 1, backgroundColor: 'green', flexDirection: 'column'}}>
          <Image style={{flex: 2, borderRadius: 10, margin: 10}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
          <View style={{flex: 1, backgroundColor: 'blue', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <Image style={{height: 30, width: 30, borderRadius: 50}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}></Image>
            <View>
              <DatePicker
                style={{width: 100}}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={()=> this.setState({date: date})}/>
            </View>
            <Image style={{height: 30, width: 30, borderRadius: 50}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}></Image>
          </View>
          <View style={{flex: 4, backgroundColor: 'lime'}}>
            <TextInput style={{flex: 1, margin: 10, backgroundColor: 'white', textAlignVertical: 'top'}} multiline={true}   placeholder="Complete bucket"/>
          </View>
        </View>
      </View>
    )
  }
}

