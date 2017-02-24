import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Modal
} from 'react-native';

import {connect} from 'react-redux';

import {Actions} from 'react-native-router-flux';
import NavigationBar from '../../general/NavigationBar';

import {authActionCreators} from '../../auth/authReducer';

class Profile extends Component {

  constructor(props) {
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
        <View style={{flex: 1, padding: 15, flexDirection: 'column'}}>
          <View style={{flex: 4, alignItems: 'center'}}>
            <View style={{flex: 3, alignItems: 'center', padding: 30}}>
              <Image style={{width: 100, height: 100, borderRadius: 50}}
                     source={{uri: this.props.myData.profileImage}}>
              </Image>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <View style={{width: 100, height: 25, borderBottomWidth: 1, borderBottomColor: 'black'}}>
                <TextInput style={{flex: 1, fontSize: 10, textAlign: 'center', textAlignVertical: 'bottom'}} value={this.props.myData.nickName}/>
              </View>
            </View>
          </View>
          <View style={{flex: 3, flexDirection: 'column', padding: 20}}>
              <View style={{flex: 1.5}}></View>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{flex: 2, fontSize: 10, textAlign: 'center'}}>Name</Text>
                <View style={{flex: 8, borderBottomWidth: 1, borderBottomColor: 'black'}}>
                  <TextInput style={{flex: 1, fontSize: 10, textAlignVertical: 'bottom'}} placeholder="Name" value={this.props.myData.name}/>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{flex: 2, fontSize: 10, textAlign: 'center'}}>Gender</Text>
                <View style={{flex: 8, borderBottomWidth: 1, borderBottomColor: 'black'}}>
                  <TextInput style={{flex: 1, fontSize: 10, textAlignVertical: 'bottom'}} placeholder="Gender"/>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{flex: 2, fontSize: 10, textAlign: 'center'}}>Email</Text>
                <View style={{flex: 8, borderBottomWidth: 1, borderBottomColor: 'black'}}>
                  <TextInput style={{flex: 1, fontSize: 10, textAlignVertical: 'bottom'}} placeholder="Email" value={this.props.myData.email}/>
                </View>
              </View>
              <View style={{flex: 1.5}}></View>
          </View>
          <View style={{flex: 3, flexDirection: 'column'}}>
            <TouchableOpacity
              style={{flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 20}}
              onPress={()=>Actions.editPassword()}>
              <Text>Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 20}}
              onPress={()=>this.setState({confirmVisible: true, confirmText: 'Really Log out?'})}>
              <Text>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 20}}
              onPress={()=>this.setState({confirmVisible: true, confirmText: 'Really Destroy?'})}>
              <Text>Destroy</Text>
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
      Actions.auth();
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
