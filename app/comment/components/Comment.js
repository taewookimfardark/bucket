import React, {Component} from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
import {connect} from 'react-redux';

import constants from '../../general/constants';
import colors from '../../general/colors';


export default class Comment extends Component {

  constructor(props){
    console.log(props);
    super(props);
  }

  render() {
    return (
      <View style={{width: this.props.width, flexDirection: 'row', padding: 10}}>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{width: constants.profileS, height: constants.profileS, borderRadius: constants.profileS / 2}} source={{uri: this.props.comment.user.profileImage}}/>
        </View>
        <View style={{flex: 10, flexDirection: 'column'}}>
          <Text>{this.props.comment.message}</Text>
          <Text style={{fontSize: 10, color: colors.colorBackgroundOpacity}}>
            {this.props.comment.created}
          </Text>
        </View>
      </View>
    )
  }
}

