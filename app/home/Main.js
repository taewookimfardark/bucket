import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Tabbar,
  Modal,
  Image,
  Button
} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import Album from './components/Album';
import HomePage from './components/HomePage';
import Inbox from './components/Inbox';

import ViewPager from 'react-native-viewpager';

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
            <View style={{flex:1, margin: 30, backgroundColor: 'white', opacity: 1, borderRadius: 10, flexDirection: 'column'}}>
              <View style={{flex: .8, flexDirection: 'column'}}>
                <TouchableOpacity title="X"
                        onPress={()=> this.props.closeModal({})}
                        style={{position: 'absolute', backgroundColor: 'lime', top: 10, right:10}}
                        />
                <Image style={{flex: 6, borderRadius: 10, marginBottom: 10}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}></Image>
                <View style={{flex: 2, flexDirection: 'row', backgroundColor: 'red'}}>
                  <View style={{flex: 9, flexDirection: 'column', backgroundColor: 'green'}}>
                    <Text>Subject</Text>
                    <Text>Date</Text>
                  </View>
                  <View style={{flex: 1, backgroundColor: 'blue'}}>
                    <Text>button</Text>
                  </View>
                </View>
                <Text style={{flex: 4, backgroundColor: 'pink'}}>message</Text>
              </View>
              <View style={{flex: .1, flexDirection: 'row'}}>
                <TouchableHighlight onPress={() => {this.props.closeModal({})}} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Text>Fail</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {this.props.closeModal({}); Actions.completeBucket();}} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Text>Complete</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
        <View style={{
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 0.5,
          borderBottomColor: 'rgba(128, 128, 128, 0.7)'
        }}>
          {this.props.rawDataSource.map((data, index) => (
            <TouchableOpacity key={index} onPress={()=> pager && pager.goToPage(index)} style={{}}>
              <Text style={{textAlignVertical: 'center', textAlign: 'center'}}>{data.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <ViewPager
          renderPageIndicator={false}
          ref={p => {pager = p}}
          dataSource={this.props.dataSource}
          renderPage = {data => {
            switch(data.type) {
              case 'homePage':
                return (<HomePage/>);
              case 'album':
                return (<Album/>);
              case 'inbox':
                return (<Inbox/>);
              default:
                return (<HomePage/>);
            }}
          }
          onChangePage={pageIndex => this.setState({currentPageIndex: pageIndex})}
          initialPage={1}>
        </ViewPager>
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