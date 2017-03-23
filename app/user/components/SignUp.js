import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {imageActionCreators} from '../../image/imageReducer';
import {authActionCreators} from '../../auth/authReducer';

import constants from '../../general/constants';
import colors from '../../general/colors';

import ImagePicker from 'react-native-image-picker';
import NavigationBar from '../../general/NavigationBar';

class SignUp extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: null,
      password: null,
      passwordConfirm: null,
      name: null,
      selectedGender: 'MALE'
    }
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let body = new FormData();
        body.append('file', {uri: response.uri, name: response.fileName, type: 'multipart/form-data'});
        this.props.postImage(body);
      }
    });
  }

  signUp() {
    if(this.state.password !== this.state.passwordConfirm) {
      Alert.alert('Check password!');
      this.setState({
        password: null,
        passwordConfirm: null
      });
      return;
    }
    const userObj = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      gender: this.state.selectedGender,
      profileImage: this.props.uploadedImage.servingUrl,
      profileImageId: this.props.uploadedImage.id
    };
    this.props.signUp(userObj);
  }

  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationBar backButton={Actions.pop} completeButton={this.signUp.bind(this)} title="Sign up"/>
        <View style={{flex: 1, paddingHorizontal: 30, paddingVertical: 80}}>
          <View style={{flex: 1}}>
            <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={this.selectPhotoTapped.bind(this)}
                style={{width: 140, height: 140, backgroundColor: colors.colorBucketOpacity, borderRadius: 70, alignItems: 'center', justifyContent: 'center'}}>
                {
                  this.props.uploadedImage ? <Image style={{width: 140, height: 140, borderRadius: 70, zIndex: 1}} source={{uri: this.props.uploadedImage.servingUrl}}/>
                      :
                  <Text style={{color: 'white', fontSize: 30}}>+</Text>
                }
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
              <View style={{height: 30, width: 120, borderBottomWidth: 0.5, borderBottomColor: colors.colorBackgroundOpacity}}>
                <TextInput
                  style={{flex: 1, fontSize: 15, textAlign: 'center'}}
                  onChangeText={(text)=> this.setState({name: text})}
                  placeholder="Name"/>
              </View>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
            <View style={{width: 300, height: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5}}>
              <Text style={{flex: 3, textAlign: 'right', marginRight: 5, textAlignVertical: 'bottom', alignItems: 'center', justifyContent: 'center'}}>Id</Text>
              <View style={{flex: 7, borderBottomWidth: 0.5, borderBottomColor: colors.colorBucketOpacity}}>
                <TextInput
                  onChangeText={(text)=> this.setState({email: text})}
                  style={{flex: 1, fontSize: 15, textAlignVertical: 'bottom'}}/>
              </View>
            </View>
            <View style={{width: 300, height: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5}}>
              <Text style={{flex: 3, textAlign: 'right', marginRight: 5, textAlignVertical: 'bottom', alignItems: 'center', justifyContent: 'center'}}>Password</Text>
              <View style={{flex: 7, borderBottomWidth: 0.5, borderBottomColor: colors.colorBucketOpacity}}>
                <TextInput
                  onChangeText={(text)=> this.setState({password: text})}
                  secureTextEntry={true}
                  style={{flex: 1, fontSize: 15}}/>
              </View>
            </View>
            <View style={{width: 300, height: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5}}>
              <Text style={{flex: 3, textAlign: 'right', marginRight: 5, textAlignVertical: 'bottom', alignItems: 'center', justifyContent: 'center'}}>PW Confirm</Text>
              <View style={{flex: 7, borderBottomWidth: 0.5, borderBottomColor: colors.colorBucketOpacity}}>
                <TextInput
                  onChangeText={(text)=> this.setState({passwordConfirm: text})}
                  secureTextEntry={true}
                  style={{flex: 1, fontSize: 15}}/>
              </View>
            </View>
            <View style={{width: 300, height: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5}}>
              <Text style={{flex: 3, textAlign: 'right', marginRight: 5, textAlignVertical: 'bottom', alignItems: 'center', justifyContent: 'center'}}>Gender</Text>
              <View style={{flex: 7, justifyContent: 'space-around', alignItems: 'center', marginVertical: 10, flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={()=>this.setState({selectedGender: 'MALE'})}
                  style={{...genderButton,
                          backgroundColor: this.state.selectedGender === 'MALE' ? colors.colorBucketOpacity : 'transparent',
                          borderWidth: this.state.selectedGender !== 'MALE' ? 0.5 : 0,
                          borderColor: this.state.selectedGender !== 'MALE' ? colors.colorBlackBackgroundOpacity : 'transparent'}}>
                  <Text style={{color: this.state.selectedGender === 'MALE' ? 'white': 'black', fontSize: 15}}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>this.setState({selectedGender: 'FEMALE'})}
                  style={{...genderButton,
                          backgroundColor: this.state.selectedGender === 'FEMALE' ? colors.colorBucketOpacity : 'transparent',
                          borderWidth: this.state.selectedGender !== 'FEMALE' ? 0.5 : 0,
                          borderColor: this.state.selectedGender !== 'FEMALE' ? colors.colorBlackBackgroundOpacity : 'transparent'}}>
                  <Text style={{color: this.state.selectedGender === 'FEMALE' ? 'white': 'black', fontSize: 15}}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const genderButton = {
    width: 60,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
};

const mapStateToProps = (state, ownProps) => {
  return {
    uploadedImage: state.image.uploadedImage
  }
};

const mapDispatchToProps = dispatch => {
  return {
    postImage: (body) => {dispatch(imageActionCreators.postImage(body))},
    signUp: (user) => {dispatch(authActionCreators.signUp(user))}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

