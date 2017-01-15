import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import {Router, Scene} from 'react-native-router-flux';

import Auth from './auth/Auth';
import HomeContainer from './home/HomeContainer';
import Register from './home/components/Register';
import Profile from './home/components/Profile';
import CompleteBucket from './home/components/CompleteBucktet';

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
            key="tabbar"
            tabs={true}
            tabBarStyle={{ backgroundColor: '#FFFFFF' }}
          >
            <Scene key="home" title="Home" icon={TabIcon}>
              <Scene
                key="a"
                component={HomeContainer}
                hideNavBar={true}
              />
            </Scene>
            <Scene key="register" title="Register" icon={TabIcon}>
              <Scene
                key="b"
                component={Register}
                hideNavBar={true}
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