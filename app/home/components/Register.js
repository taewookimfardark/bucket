import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import NavigationBar from '../../general/NavigationBar';

import {Actions} from 'react-native-router-flux';

export default class Register extends Component {
  render() {
    return(
      <View style={{flex: 1, flexDirection: 'column'}}>
        <NavigationBar title='New Bucket' backButton={()=> Actions.home()} completeButton={()=> Actions.home()}/>
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'orange'}}>
          <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{borderRadius: 50, width: 30, height: 30}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}></Image>
          </View>
          <TextInput style={{flex: 8}} placeholder="Title"/>
        </View>
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white'}}>
          <View style={{flex: 8, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <DatePicker
              style={{width: 200}}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={()=> this.setState({date: date})}/>
            <Text> ~ </Text>
            <DatePicker
              style={{width: 200}}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={()=> this.setState({date: date})}/>
          </View>
          <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{borderRadius: 50, width: 30, height: 30}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}></Image>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'lime', justifyContent: 'center'}}>
          <Text style={{flex: 2}}>Url</Text><TextInput style={{flex: 8}} placeholder="Put URL"/>
        </View>
        <View style={{flex: 4, backgroundColor: 'blue'}}>
        </View>
        <View style={{flex: 4, backgroundColor: 'green'}}>
          <TextInput
            multiline={true}
            placeholder="Content"
            style={{textAlignVertical: 'top', flex: 1, margin: 10, borderRadius: 10, backgroundColor: 'white'}}/>
        </View>
      </View>
    )
  }
}