import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Tabbar,
  Modal,
  Image,
  Button,
  TextInput
} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import colors from '../general/colors';

import TabBar from './TabBar';
import Album from './components/Album';
import HomePage from './components/HomePage';
import Inbox from './components/Inbox';

import ViewPager from 'react-native-viewpager';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import * as modalActionCreators from '../general/modal/modalActionCreators';


class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPageIndex: 1
    }
  };

  render() {

    return(
      <View style={{flex: 1}}>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.props.modalOption.visible}
          onRequestClose = {()=> this.props.closeModal({})}>
          <View style={{flex: 1, backgroundColor: 'rgba(10,10,10, 0.7)'}}>
            <View style={{flex:1, marginTop: 120, marginBottom: 120, backgroundColor: 'white', opacity: 1, borderRadius: 10, flexDirection: 'column'}}>
              <View style={{flex: .9, flexDirection: 'column'}}>
                <Image style={{flex: 6, borderRadius: 10, marginBottom: 10}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}></Image>
                <View style={{flex: 1, flexDirection: 'row', padding: 5}}>
                  <View style={{flex: 9, flexDirection: 'column', borderBottomWidth: 1, borderBottomColor: 'grey'}}>
                    <Text>Title</Text>
                  </View>
                  <View style={{flex: 1, borderBottomWidth: 1, borderBottomColor: 'grey'}}>
                    <Text>but</Text>
                  </View>
                </View>
                <View style={{flex: 3, flexDirection: 'row', padding: 10}}>
                  <View style={{flex: 1.5, alignItems: 'center'}}>
                    <Image style={{width: 20, height: 20, borderRadius: 10}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}></Image>
                  </View>
                  <View style={{flex: 10}}>
                    <Text>dfdfdfdfdfdfdf
                    dfdfdsdfsdfsdfshdfksjdhfkasjfhksajfhaskfjhaskfjhsakfjhsadkfjhsakfjhaskfdjhaskjfdhsakjdfhaskjdhfkasjhk
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flex: .05, flexDirection: 'row', padding: 10}}>
                <TouchableHighlight onPress={() => {this.props.closeModal({}); Actions.completeBucket();}}
                                    style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.colorBucket, borderRadius: 5}}>
                  <Text style={{color: 'white'}}>Complete</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
        <ScrollableTabView
          initialPage={1}
          style={{marginTop: 20}}
          renderTabBar={() => <TabBar/>}>
          <Album/>
          <HomePage/>
          <Inbox/>
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    modalOption: state.modal
  }
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: (option) => dispatch(modalActionCreators.closeModal(option))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main)