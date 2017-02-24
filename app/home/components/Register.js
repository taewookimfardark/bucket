import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput
} from 'react-native';

import colors from '../../general/colors';

import DatePicker from 'react-native-datepicker';
import NavigationBar from '../../general/NavigationBar';

import {Actions} from 'react-native-router-flux';

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      titleInputFocus: false,
      urlInputFocus: false,
      contentInputFocus: false
    }
  }

  render() {
    return(
      <View style={{flex: 1, flexDirection: 'column'}}>
        <NavigationBar title='New Bucket' backButton={()=> Actions.home()} completeButton={()=> Actions.home()}/>
        <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
          <View style={{flex: 3, position: 'relative', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, borderRadius: 10}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}></Image>
          </View>
          <View style={{flex: 0.5, padding: 5}}>
            <View style={{flex: 1, borderBottomWidth: 1, borderBottomColor: this.state.titleInputFocus ? 'purple' : 'black'}}>
              <TextInput
                style={{flex: 1, textAlignVertical: 'bottom', fontSize: 10}}
                onFocus={()=>this.setState({titleInputFocus: true})}
                onBlur={()=>this.setState({titleInputFocus: false})}
                underlineColorAndroid='transparent'
                placeholder="New Bucket Title.."/>
            </View>
          </View>
          <View style={{flex: 3, flexDirection: 'row', padding: 10}}>
            <View style={{flex: 1.5, alignItems: 'center'}}>
              <Image style={{width: 20, height: 20, borderRadius: 10}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}></Image>
            </View>
            <View style={{flex: 10, padding: 5, borderRadius: 5, borderWidth: 0.5, flexDirection: 'row',
                      borderColor: this.state.contentInputFocus ? 'purple' : 'black'}}>
              <TextInput
                multiline={true}
                underlineColorAndroid='transparent'
                placeholder="Content"
                onFocus={()=>this.setState({contentInputFocus: true})}
                onBlur={()=>this.setState({contentInputFocus: false})}
                style={{textAlignVertical: 'top', flex: 14, fontSize: 10}}/>
            </View>
          </View>
          <View style={{flex: 4}}>
          </View>
        </View>
      </View>
    )
  }
}