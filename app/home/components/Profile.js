import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions
} from 'react-native';

import {connect} from 'react-redux';

import {Actions} from 'react-native-router-flux';
import NavigationBar from '../../general/NavigationBar.ios';
import colors from '../../general/colors';

import {authActionCreators} from '../../auth/authReducer';
import {bucketActionCreators} from '../../bucket/bucketReducer';
import {groupActionCreators} from '../../group/groupReducer';

const fullWidth = Dimensions.get('window').width;

class Profile extends Component {

  constructor(props) {
    console.log('open profile');
    super(props);
    this.state = {
      confirmText: '',
      confirmVisible: false
    }
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.confirmVisible}
          onRequestClose = {()=> this.setState({confirmVisible: false, confirmText: ''})}>
          <View style={{flex: 1, backgroundColor: 'rgba(10,10,10, 0.7)', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{height: 200, width: 400, margin: 30, backgroundColor: 'white', opacity: 1, borderRadius: 10, flexDirection: 'column'}}>
              <View style={{flex: 2, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center'}}>{this.state.confirmText}</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                  onPress={()=>{
                    this.setState({confirmVisible: false, confirmText: ''});
                  }}>
                  <Text>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                  onPress={() => {
                    this.setState({confirmVisible: false, confirmText: ''});
                    this.props.logout();
                  }}>
                  <Text>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <NavigationBar title="myProfile" backButton={()=>Actions.home()} completeButton={()=>Actions.home()}/>
        <View style={{flex: 1, padding: 15, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flex: 4, alignItems: 'center'}}>
            <View style={{flex: 3, alignItems: 'center', padding: 30}}>
              <Image style={{width: 100, height: 100, borderRadius: 50}}
                     source={{uri: this.props.myData.profileImage}}>
              </Image>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <View style={{width: 100, height: 30, borderBottomWidth: 1, borderBottomColor: colors.colorBackgroundOpacity, justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  editable={false}
                  style={{width: 100, height: 30, fontSize: 10, color: 'black', textAlign: 'center', textAlignVertical: 'bottom'}}
                  value={this.props.myData.name}/>
              </View>
            </View>
          </View>
          <View style={{flex: 3, flexDirection: 'column', padding: 20}}>
            <View style={{width: fullWidth * 0.7, height: 40, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{flex: 2, fontSize: 10, textAlign: 'center'}}>Gender</Text>
              <View style={{flex: 8, borderBottomWidth: 1, borderBottomColor: colors.colorBackgroundOpacity}}>
                <TextInput
                  editable={false}
                  style={{flex: 1, fontSize: 10, textAlignVertical: 'bottom', color: 'black'}}
                  placeholder="Gender"
                  value={this.props.myData.gender}/>
              </View>
            </View>
            <View style={{width: fullWidth * 0.7, height: 40, flexDirection: 'row', alignItems: 'center', flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{flex: 2, fontSize: 10, textAlign: 'center'}}>Email</Text>
              <View style={{flex: 8, borderBottomWidth: 1, borderBottomColor: colors.colorBackgroundOpacity}}>
                <TextInput
                  editable={false}
                  style={{flex: 1, fontSize: 10, textAlignVertical: 'bottom', color: 'black'}}
                  placeholder="Email"
                  value={this.props.myData.email}/>
              </View>
            </View>
          </View>
          <View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              style={{height: 30, width: 300, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 20}}
              onPress={()=>this.setState({confirmVisible: true, confirmText: 'Really Log out?'})}>
              <Text>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    myData: state.auth.myData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(authActionCreators.deleteAuthToken());
      dispatch(authActionCreators.setMyData(null));
      dispatch(bucketActionCreators.resetBucket());
      dispatch(groupActionCreators.resetGroup());
      Actions.auth();
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
