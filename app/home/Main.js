import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Tabbar,
  Modal,
  Image,
  Button,
  TextInput,
  Dimensions
} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import colors from '../general/colors';
import constants from '../general/constants';

import TabBar from './TabBar';
import Album from './components/Album';
import HomePage from './components/HomePage';
import Inbox from './components/Inbox';
import BucketModal from '../general/modal/components/bucketModal';

import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import * as modalActionCreators from '../general/modal/modalActionCreators';
import {bucketActionCreators} from '../bucket/bucketReducer';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

class Main extends Component {

  constructor(props) {
    super(props);

    this.props.getBucket(this.props.groupId);

    this.state = {
      currentPageIndex: 1,
      currentGroup: this.props.groups[this.props.groupId]
    }
  };

  render() {

    return(
      <View style={{flex: 1}}>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.props.modalOption.visible}
          onRequestClose = {()=> this.props.closeModal()}>
          <BucketModal modalName={this.props.modalOption.name} closeModal={this.props.closeModal} bucket={this.props.modalOption.params} myData={this.props.myData}/>
        </Modal>
        <ScrollableTabView
          initialPage={1}
          style={{marginTop: 20}}
          renderTabBar={() => <TabBar/>}>
          <Album completedBuckets={this.props.buckets.filter((b) => b.status === 'COMPLETED')}/>
          <HomePage acceptedBuckets={this.props.buckets.filter((b) => b.status === 'ACCEPTED')}/>
          <Inbox requestedBuckets={this.props.buckets.filter((b) => (b.status === 'REQUESTED'))}/>
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let bucketList = Object.keys({...state.bucket}).map((key) => {
    if(state.bucket[key].created){
      let date = new Date(state.bucket[key].created * 1000);
      let dateString = `${date.getFullYear()} / ${date.getMonth()+1} / ${date.getDate()}`;
      state.bucket[key].created = dateString;
    }
    return state.bucket[key];
  });
  bucketList = bucketList.filter((bucket) => bucket.groupId === ownProps.groupId);
  return {
    ...ownProps,
    modalOption: state.modal,
    groups: state.group,
    buckets: bucketList,
    myData: state.auth.myData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(modalActionCreators.closeModal()),
    getBucket: (groupId) => dispatch(bucketActionCreators.getBucket(groupId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main)