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
          <TouchableOpacity
            style={{flex: 1, backgroundColor: colors.colorBackgroundOpacity, justifyContent: 'center', alignItems: 'center'}}
            onPress={()=> this.props.closeModal()}>
            <TouchableOpacity
              activeOpacity={1}
              style={{width: fullWidth * constants.modalWidthRatio, height: fullHeight * constants.modalHeightRatio, backgroundColor: 'white', opacity: 1, borderRadius: 10, flexDirection: 'column', zIndex: 1}}>
              <View style={{flex: .92, flexDirection: 'column', borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                <Image style={{flex: 6, borderRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginBottom: 10}}
                       source={{uri: this.props.modalOption.params && this.props.modalOption.params.profileImage ? this.props.modalOption.params.profileImage +'=s300' : ''}}></Image>
                <View style={{flex: 1, paddingHorizontal: 10}}>
                  <View style={{flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'grey'}}>
                    <View style={{flex: 9, flexDirection: 'column', justifyContent: 'center'}}>
                      <Text>{this.props.modalOption.params && this.props.modalOption.params.title || '-'}</Text>
                    </View>
                    <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Icon name="md-create" size={24}/>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{flex: 3, flexDirection: 'row', padding: 10}}>
                  <View style={{flex: 1.5, alignItems: 'center'}}>
                    <Image style={{width: 30, height: 30, borderRadius: 15}} source={{uri: this.props.myData.profileImage}}></Image>
                  </View>
                  <View style={{flex: 10}}>
                    <Text>{this.props.modalOption.params && this.props.modalOption.params.description || '-'}</Text>
                  </View>
                </View>
              </View>
              <View style={{flex: .08, flexDirection: 'row', padding: 10}}>
                <TouchableHighlight onPress={() => {this.props.closeModal({}); Actions.completeBucket();}}
                                    style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.colorBucket, borderRadius: 10}}>
                  <Text style={{color: 'white'}}>Complete</Text>
                </TouchableHighlight>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
        <ScrollableTabView
          initialPage={1}
          style={{marginTop: 20}}
          renderTabBar={() => <TabBar/>}>
          <album/>
          <HomePage buckets={this.props.buckets}/>
          <Inbox/>
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let bucketList = Object.keys({...state.bucket}).map((key) => state.bucket[key]);
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