import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import {Router, Scene} from 'react-native-router-flux';

import Auth from './auth/Auth';
import MainContainer from './home/MainContainer';
import Register from './home/components/Register';
import Profile from './home/components/Profile';
import CompleteBucket from './home/components/CompleteBucktet';
import EditPassword from './home/components/EditPassword';

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
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
            hideNavBar={true}
            initial
          />
          <Scene
            key="completeBucket"
            component={CompleteBucket}
            hideNavBar={true}
            title="Complete Bucket"
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
            <Scene key="home" title="Home" icon={TabIcon}>
              <Scene
                key="a"
                component={MainContainer}
                hideNavBar={true}
              />
            </Scene>
            <Scene key="register" title="Register" icon={TabIcon}>
              <Scene
                key="b"
                component={Register}
                hideNavBar={true}
                hideTabBar={true}
              />
            </Scene>
            <Scene key="profile" title="Profile" icon={TabIcon}>
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