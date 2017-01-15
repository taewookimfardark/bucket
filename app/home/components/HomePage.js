import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as NavigationActionCreators from '../../general/navigation/NavigationActionCreators';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';
import BucketCard from './BucketCard';
import Auth from '../../auth/Auth';

import {Actions, Router, Scene} from 'react-native-router-flux';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible : false
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }

  render() {
    return(
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ScrollView style={{flex: .95, flexDirection: 'column'}}>
          <BucketCard/>
          <BucketCard/>
          <BucketCard/>
          <BucketCard/>
          <BucketCard/>
          <BucketCard/>
          <BucketCard/>
          <BucketCard/>
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pageToRegister: () => dispatch(NavigationActionCreators.push({key: 'register', title: 'Register'})),
    pageToProfile: () => dispatch(NavigationActionCreators.push({key: 'profile', title: 'Profile'}))
  }
};

export default connect(undefined, mapDispatchToProps)(HomePage)

