import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity  
} from 'react-native'
import {connect} from 'react-redux';

import * as modalActionCreators from '../../general/modal/modalActionCreators';


class BucketCard extends Component {
  render(){
    return(
      <TouchableOpacity style={{height: 200, flex: 1}} onPress={()=> this.props.openModal({})}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 0.05}}></View>
          <View style={{flex: 0.9, flexDirection: 'row'}}>
            <View style={{flex: 0.05}}></View>
            <View style={{flex: 0.9, flexDirection: 'column', backgroundColor: 'grey', borderRadius: 10}}>
              <View style={{height: 60, position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{flexDirection: 'column', left: 10}}>
                  <Text style={{flex: 1}}>Bucket title</Text>
                  <Text style={{flex: 1}}>content</Text>
                </View>
                <Image style={{width: 30, height: 30, right: 10, borderRadius: 50}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
              </View>
            </View>
            <View style={{flex: 0.05}}></View>
          </View>
          <View style={{flex: 0.05}}></View>
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

export default connect(undefined, mapDispatchToProps)(BucketCard)

