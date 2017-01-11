import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Tabbar
} from 'react-native';

import Album from './components/Album';
import HomePage from './components/HomePage';
import Inbox from './components/Inbox';

import ViewPager from 'react-native-viewpager';


export default class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPageIndex: 1
    }
  };

  render() {

    return(
      <View style={{flex: 1}}>
        <View style={{
          height: 60,
          backgroundColor: 'purple',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {this.props.rawDataSource.map((data, index) => (
            <TouchableOpacity key={index} onPress={()=> pager && pager.goToPage(index)} style={{}}>
              <Text>{data.title}</Text>
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
                return (<HomePage pageToHome={()=> {
                  console.log('click');
                  pager && pager.goToPage(1);}}/>);
              case 'album':
                return (<Album/>);
              case 'inbox':
                return (<Inbox/>);
            }}
          }
          onChangePage={pageIndex => this.setState({currentPageIndex: pageIndex})}>
        </ViewPager>
      </View>
    )
  }
}