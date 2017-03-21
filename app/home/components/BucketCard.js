import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity  
} from 'react-native'

import {connect} from 'react-redux';
import * as modalActionCreators from '../../general/modal/modalActionCreators';
import constants from '../../general/constants';


class BucketCard extends Component {
  render(){
    return(
      <TouchableOpacity style={{height: 200, flex: 1, padding: 10}} onPress={()=> this.props.openModal('completeBucket', this.props.bucket)}>
        <View style={{flex: 1, borderRadius: 10}}>
          <Image source={{uri: this.props.bucket.profileImage}} style={{flex: 1, borderRadius: 10}}/>
          <View style={{flex: 1, height: 30, position: 'absolute', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, bottom: 0, right: 0, left: 0, backgroundColor: 'black', opacity: 0.7, justifyContent: 'center'}}>
            <Text style={{paddingLeft: 10, fontSize: 10, color: 'white', zIndex: 1}}>{this.props.bucket.title}</Text>
          </View>
          <Image style={{position: 'absolute', right: 15, bottom: 15, height: constants.profileS, width: constants.profileS, borderRadius: constants.profileS / 2}} source={{uri: this.props.bucket.user.profileImage}}/>
        </View>
      </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return{
    openModal: (name, option) => dispatch(modalActionCreators.openModal(name, option))
  }
};

export default connect(undefined, mapDispatchToProps)(BucketCard)

