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
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose{() => {alert('modal close')}}>
          <View style={{backgroundColor: 'gery', opacity: .9, flex: 1}}>
            <View style={{margin: 50}}>
              <Text>modal</Text>
              <TouchableOpacity onPress={e => this.setModalVisible(false)}><Texxt>hide</Texxt></TouchableOpacity>
            </View>
          </View>
        </Modal>
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
        <View style={{flex: .05, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={e=>this.props.pageToHome()}>
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={e=>this.props.pageToRegister()}>
            <Text>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={e=>this.props.pageToProfile()}>
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>
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

