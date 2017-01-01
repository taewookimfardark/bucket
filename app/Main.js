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

  renderTabs() {
    return(
      <View style={{flex: 2, flexDirection: 'row'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={()=> this.onTabSelect('home')}>
          <View>
            <Text>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={()=> this.onTabSelect('register')}>
          <View>
            <Text>Register</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={()=> this.onTabSelect('profile')}>
          <View>
            <Text>Profile</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
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
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 8}}>
          {this.renderContent()}
        </View>
        <Tabbar show={true}
                disable={false}>
          {this.renderTabs()}
        </Tabbar>
      </View>
    )
  }
}