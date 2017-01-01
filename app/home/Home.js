import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight
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

    var pager = null;

    return(
      <View style={{flex: 1}}>
        <View style={{
          height: 30,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          {this.props.rawDataSource.map((data, index) => (
            <TouchableHighlight key={index} onPress={()=> pager && pager.goToPage(index)} style={{flex: 1, width: 60, alignItems: 'center'}}>
              <Text>{data.title}</Text>
            </TouchableHighlight>
          ))}
        </View>
        <ViewPager
          renderPageIndicator={false}
          ref={p => {console.log(p);
                     pager = p}}
          dataSource={this.props.dataSource}
          renderPage = {data => {
            switch(data.type) {
              case 'album':
                return (<Album/>);
              case 'homePage':
                return (<HomePage/>);
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