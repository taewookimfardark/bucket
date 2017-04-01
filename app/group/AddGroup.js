import React, {Component} from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';


import colors from '../general/colors';

import NavigationBar from '../general/NavigationBar.ios';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import {Actions} from 'react-native-router-flux';
import {userActionCreators} from '../user/userReducer';
import {imageActionCreators} from '../image/imageReducer';
import {groupActionCreators} from '../group/groupReducer';

class AddGroup extends Component {

  constructor(props) {

    super(props);

    this.state = {
      avatarSource: null,
      videoSource: null,
      searchMode: false,
      members: [],
      groupName: null
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
        let source = { uri: response.uri };

        let body = new FormData();
        body.append('file', {uri: response.uri, name: response.fileName, type: 'multipart/form-data'});
        this.props.postImage(body);

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  createGroup() {
    let groupObj = {
      name: this.state.groupName,
      profileImageId: this.props.uploadedImage.id,
      profileImage: this.props.uploadedImage.servingUrl,
      userId: this.props.myData.id
    };
    this.props.postGroup(groupObj);
  }

  render() {
    return(
      <View style={{flex: 1, flexDirection: 'column'}}>
        <NavigationBar backButton={Actions.pop} completeButton={this.createGroup.bind(this)} title="Add Group"/>
        <View style={{flex: 2, paddingHorizontal: 20}}>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={{width: 140, height: 140, borderRadius: 10, backgroundColor: colors.colorBucketOpacity, justifyContent: 'center', alignItems: 'center'}}>
              {!this.props.uploadedImage ? <Text style={{color: 'white', fontSize: 30}}>+</Text> : <Image style={styles.avatar} source={{uri: this.props.uploadedImage.servingUrl}}/>}
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{borderBottomWidth: 1, width: 100, height: 35, borderBottomColor: 'grey'}}>
              <TextInput
                style={{width: 100, height: 40, fontSize: 15, textAlign: 'center'}}
                placeholder='Name'
                underlineColorAndroid='transparent'
                onChangeText={(text) => this.setState({groupName: text})}/>
            </View>
          </View>
        </View>
        <View style={{flex: 2, alignItems: 'center', paddingHorizontal: 20}}>
          <View style={styles.memberItem}>
            <Text style={styles.memberName}>{this.props.myData.email}</Text>
          </View>

          {this.state.members.map((member) => {
            return(
              <View style={styles.memberItem} key={member.id}>
                <TouchableOpacity style={styles.buttonClose}>
                  <Icon size={25} name="ios-close"/>
                </TouchableOpacity>
                <Text style={styles.memberName}>{member.email}</Text>
              </View>
            )
          })}
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 10,
    width: 140,
    height: 140,
    zIndex: 1
  },
  memberItem: {
    width: 320,
    height: 30,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  memberTextInput: {
    width: 320,
    height: 30,
    fontSize: 15,
    paddingLeft: 6
  },
  memberName: {
    fontSize: 15
  },
  buttonClose: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    myData: state.auth.myData,
    uploadedImage: state.image.uploadedImage
  }
};

const mapDispatchToProps = dispatch => {
  return {
    searchUsers: () => {dispatch(userActionCreators.getUsers());},
    postImage: (body) => {dispatch(imageActionCreators.postImage(body))},
    postGroup: (group) => {dispatch(groupActionCreators.postGroup(group))}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup)
