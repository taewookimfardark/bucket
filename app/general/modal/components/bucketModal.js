import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Modal,
  Dimensions
} from 'react-native';

import {connect} from 'react-redux';

import colors from '../../colors';
import constants from '../../constants';

import {bucketActionCreators} from '../../../bucket/bucketReducer';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

import ManageBucketModal from '../../../home/components/ManageBucketModal';
import ShowBucketModal from '../../../home/components/ShowBucketModal';

class BucketModal extends Component {
  render(){
    return(
      <TouchableOpacity
        style={{flex: 1, backgroundColor: colors.colorBackgroundOpacity, justifyContent: 'center', alignItems: 'center'}}
        onPress={()=> this.props.closeModal()}>
        <TouchableOpacity
          activeOpacity={1}
          style={{width: fullWidth * constants.modalWidthRatio, height: fullHeight * constants.modalHeightRatio, backgroundColor: 'white', opacity: 1, borderRadius: 10, flexDirection: 'column', zIndex: 1}}>
          { this.props.modalName === 'completeBucket' || this.props.modalName === 'acceptBucket' ?
            <ManageBucketModal bucket={this.props.bucket} closeModal={this.props.closeModal} updateBucket={this.props.updateBucket} myData={this.props.myData}/>
            :
            <ShowBucketModal bucket={this.props.bucket} width={fullWidth * constants.modalWidthRatio}/>
          }
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateBucket: (bucketId, params) => dispatch(bucketActionCreators.updateBucket(bucketId, params))
  }
};

export default connect(undefined, mapDispatchToProps)(BucketModal)

