import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';

import * as modalActionCreators from '../../general/modal/modalActionCreators';

class BucketInbox extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={()=> this.props.openModal(this.props.bucket)}
        style={{flex: 1, height: 120, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center'}}>
        <Image style={{width: 100, height: 100, borderRadius: 10}} source={{uri: this.props.bucket.profileImage}}/>
        <View style={{marginLeft: 10}}>
          <Text>{this.props.bucket.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return{
    openModal: (option) => dispatch(modalActionCreators.openModal(option))
  }
};

export default connect(undefined, mapDispatchToProps)(BucketInbox)
