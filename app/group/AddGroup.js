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

import NavigationBar from '../general/NavigationBar';
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
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={{width: 140, height: 140, borderRadius: 10, backgroundColor: this.props.uploadedImage ? null : colors.colorBucket, opacity: 0.7, justifyContent: 'center', alignItems: 'center'}}>
              {!this.props.uploadedImage ? <Icon name="md-add" color="white" size={35}/> : <Image style={styles.avatar} source={{uri: this.props.uploadedImage.servingUrl+'=s100'}}/>}
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{borderBottomWidth: 1, width: 100, height: 30, borderBottomColor: 'grey'}}>
              <TextInput style={{flex: 1, fontSize: 15, textAlign: 'center'}} placeholder='Name' onChangeText={(text) => this.setState({groupName: text})}/>
            </View>
          </View>
        </View>
        <View style={{flex: 3, alignItems: 'center', paddingHorizontal: 20}}>
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

          {this.state.searchMode ?
            <View>
              <View style={styles.memberItem}>
                <TextInput style={styles.memberTextInput}></TextInput>
              </View>
              {this.props.users && Object.keys(this.props.users).map(id => {
                return (
                  <TouchableOpacity key={id}
                                    onPress={(e) => {

                                      this.setState({members: [...this.state.members, this.props.users[id]], searchMode: false});
                                    }}
                                    style={{borderWidth: 1, borderRadius: 10, borderColor: 'grey', padding: 10}}>
                    <Text>{this.props.users[id].email}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
            :
            <TouchableOpacity style={styles.memberItem} onPress={()=>{
              this.setState({searchMode: true});
              this.props.searchUsers();
            }}>
              <Text>+ Add Member</Text>
            </TouchableOpacity>}
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 10,
    width: 140,
    height: 140
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
  console.log(state);
  let members = [];
  if(state.user.users) members = state.user.users.filter((user) => user.id !== state.auth.myData.id);
  return {
    myData: state.auth.myData,
    users: members,
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
