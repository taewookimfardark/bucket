import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {bindActionCreators} from 'redux';

import {authActionCreators} from './authReducer';
import colors from '../general/colors';

class Auth extends Component {

  constructor(props) {
    super(props);

    this.state = {email: '', password: ''};
  }

  render() {
    return(
      <View
        style={{
          flex: 1,
          paddingHorizontal: 50,
          paddingVertical: 100
        }}>
        <View style={{flex: 1}}>
          <View style={{flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{width: 140, height: 120, marginVertical: 15}}
              source={require('../general/image/inbox_icon.png')}/>
            <Text style={{fontSize: 18}}>Do.With</Text>
          </View>
          <View style={{flex: 2, justifyContent: 'center', paddingVertical: 20}}>
            <View style={{height: 25, marginVertical: 5, borderWidth: 1, borderColor: 'grey', borderRadius: 6, padding: 3}}>
              <TextInput
                placeholder={' id'}
                style={{flex: 1}}
                onChangeText={(text) => this.setState({email: text})}/>
            </View>
            <View style={{height: 25, marginVertical: 5, borderWidth: 1, borderColor: 'grey', borderRadius: 6, padding: 3}}>
              <TextInput
                placeholder={' password'}
                style={{flex: 1}}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password: text})}/>
            </View>
            <TouchableOpacity style={{height: 25, backgroundColor: colors.colorBucket, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 10}} onPress={e => {this.props.login(this.state.email, this.state.password)}}>
              <Text style={{color: 'white'}}>Sign In</Text>
            </TouchableOpacity>
            <View style={{height: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{textAlignVertical: 'center'}}>Don't you have an account?</Text>
              <TouchableOpacity onPress={()=>{console.log('click'); Actions.signUp();}}>
                <Text style={{textAlignVertical: 'center', color: colors.colorBucketOpacity}}> Sign-up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => {
      dispatch(authActionCreators.login(email, password));
    }
  }
};

export default connect(undefined, mapDispatchToProps)(Auth)

// const mapDispatchToProps = dispatch => {
//   return {
//     // login: () => {
//     //   dispatch(NavigationActionCreators.push({key: 'main', title: 'Main'}));
//     // }
//   }
// };
//
// export default connect(undefined, mapDispatchToProps)(Auth)



