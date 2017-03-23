import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import {Router, Scene, Modal} from 'react-native-router-flux';

import Auth from './auth/Auth';
import SignUp from './user/components/SignUp';
import Group from './group/Group';
import AddGroup from './group/AddGroup';
import MainContainer from './home/MainContainer';
import Register from './home/components/Register';
import Profile from './home/components/Profile';
import CompleteBucket from './home/components/CompleteBucktet';
import EditPassword from './home/components/EditPassword';
import AddMembers from './home/components/AddMembers';

const HomeIcon = ({ selected, title }) => {
  return (
    <Image
      style={{height: 30, width: 30}}
      source={require('./general/image/home_icon.png')}/>
  );
};

const AddIcon = ({ selected, title }) => {
  return (
    <Image
      style={{height: 30, width: 30}}
      source={require('./general/image/suggest_icon.png')}/>
  );
};

const ProfileIcon = ({ selected, title }) => {
  return (
    <Image
      style={{height: 30, width: 30}}
      source={require('./general/image/profile_icon.png')}/>
  );
};

export default class App extends Component {

  render() {
    return(
      <Router>
        <Scene key="root">
          <Scene
            key="auth"
            component={Auth}
            title="Auth"
            initial={true}
            hideNavBar={true}
          />
          <Scene
            key="signUp"
            component={SignUp}
            title="signUp"
            hideNavBar={true}
          />
          <Scene
            key="group"
            component={Group}
            title="group"
            hideNavBar={true}
          />
          <Scene
            key="addGroup"
            component={AddGroup}
            title="addGroup"
            hideNavBar={true}
          />
          <Scene
            key="completeBucket"
            component={CompleteBucket}
            hideNavBar={true}
            title="Complete Bucket"
          />
          <Scene
            key="addMembers"
            component={AddMembers}
            hideNavBar={true}
            title="Add Members"
          />
          <Scene
            key="editPassword"
            component={EditPassword}
            hideNavBar={true}
            title="Edit Password"/>
          <Scene
            key="tabbar"
            tabs={true}
            tabBarStyle={{ backgroundColor: '#FFFFFF', position: 'relative'}}
          >
            <Scene key="home" title="Home" icon={HomeIcon}>
              <Scene
                key="a"
                component={MainContainer}
                hideNavBar={true}
              />
            </Scene>
            <Scene key="register" title="Register" icon={AddIcon}>
              <Scene
                key="b"
                component={Register}
                hideNavBar={true}
                hideTabBar={true}
              />
            </Scene>
            <Scene key="profile" title="Profile" icon={ProfileIcon}>
              <Scene
                key="c"
                component={Profile}
                hideNavBar={true}
              />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    )
  }
}