import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

export default class Auth extends Component {
  render() {
    return(
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <TextInput
          style={{
            width: 100
          }}/>
        <TextInput
          style={{
          width: 100
          }}/>
        <Button title="login" onPress={e => {
          Actions.tabbar();
        }}/>
      </View>
    )
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     // login: () => {
//     //   dispatch(NavigationActionCreators.push({key: 'main', title: 'Main'}));
//     // }
//   }
// };
//
// export default connect(undefined, mapDispatchToProps)(Auth)



