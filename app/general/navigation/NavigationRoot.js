import React, {Component} from 'react';
import Main from '../../Main';
import Profile from '../../home/components/Profile';
import Register from '../../home/components/Register';
import HomePage from '../../home/components/HomePage';

import {
  BackAndroid,
  NavigationExperimental
} from 'react-native';

const {
  CardStack: NavigationCardStack
} = NavigationExperimental;

export default class NavigationRoot extends Component {
  constructor(props) {
    super(props);
    this._renderScene = this._renderScene.bind(this); // bind를 사용해야 react component가 가지고 있는 객체에 접근 가능..? ㅇㅇ
    this._handleBackAction = this._handleBackAction.bind(this);
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
  }

  _renderScene (props) {
    const {route} = props.scene;
    console.log("scene", props.secne);

    if(route.key === 'main') {
      return <Main/>
    }

    if(route.key === 'homePage') {
      return <HomePage/>
    }

    if(route.key === 'register') {
      return <Register/>
    }

    if(route.key === 'profile') {
      return <Profile/>
    }
  }

  _handleBackAction () {
    if(this.props.navigation.index === 0) {
      return false;
    }
    this.props.popRoute();
    return true;
  }

  _handleNavigate (action) {
    switch(action && action.type) {
      case 'push':
        this.props.pushRoute(action.route);
        return true;
      case 'back':
      case 'pop':
        return this._handleBackAction();
      default:
        return false;
    }
  }

  render () {
    return (
      <NavigationCardStack
        direction='vertical'
        navigationState={this.props.navigation}
        onNavigate={this._handleNavigate.bind(this)}
        renderScene={this._renderScene}/>
    )
  }
}