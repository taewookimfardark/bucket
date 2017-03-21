import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Text
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import colors from '../../general/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ManageBucketModal extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={{flex: 1}}>
        <View style={{flex: .92, flexDirection: 'column', borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
          <Image style={{flex: 6, borderRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginBottom: 10}}
                 source={{uri: this.props.bucket && this.props.bucket.profileImage ? this.props.bucket.profileImage +'=s300' : ''}}></Image>
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <View style={{flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'grey'}}>
              <View style={{flex: 9, flexDirection: 'column', justifyContent: 'center'}}>
                <Text>{this.props.bucket && this.props.bucket.title || '-'}</Text>
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
              <Text>{this.props.bucket && this.props.bucket.description || '-'}</Text>
            </View>
          </View>
        </View>
        <View style={{flex: .08, flexDirection: 'row', padding: 10}}>
          { this.props.bucket && this.props.bucket.status === 'ACCEPTED' ?
            <TouchableHighlight onPress={() => {this.props.closeModal({}); Actions.completeBucket({bucket: this.props.bucket})}}
                                style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.colorBucket, borderRadius: 10}}>
              <Text style={{color: 'white'}}>Complete</Text>
            </TouchableHighlight> :
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={()=> {this.props.closeModal({}); this.props.updateBucket(this.props.bucket.id, {status: 'REJECTED'});}}
                style={{flex: 1, marginHorizontal: 3, borderRadius: 10, borderWidth: .5, borderColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
                <Text>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=> {this.props.closeModal({}); this.props.updateBucket(this.props.bucket.id, {status: 'ACCEPTED'});}}
                style={{flex: 1, marginHorizontal: 3, borderRadius: 10, borderWidth: .5, borderColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
                <Text>Accept</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      </View>
    )
  }
}