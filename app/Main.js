import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Tabbar from 'react-native-tabbar';
import HomeContainer from './home/HomeContainer';


export default class BucketContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: 'home'
    }
  }

  onTabSelect(tab) {
    this.setState({tab});
  }

  renderContent() {
    const {tab} = this.state;
    let content;
    switch(tab){
      case 'home':
        content = <HomeContainer/>;
        break;
      case 'register':
        content = <Text>register</Text>;
        break;
      case 'profile':
        content = <Text>profile</Text>;
        break;
      default:
        content = <HomeContainer/>;
    }

    return content;
  }

  render() {
    return(
      <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
        <View style={{flex: 11}}>
          {this.renderContent()}
        </View>
      </View>
    )
  }
}