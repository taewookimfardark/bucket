import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as NavigationActionCreators from '../../general/navigation/NavigationActionCreators';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  ListView
} from 'react-native';
import BucketCard from './BucketCard';

import {bucketActionCreators} from '../../bucket/bucketReducer';

export default class HomePage extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      modalVisible : false,
      ds: ds
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }

  render() {
    return(
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ListView
          dataSource={this.state.ds.cloneWithRows(this.props.buckets)}
          enableEmptySections={true}
          renderRow={(rowData) => <BucketCard key={rowData.id} bucket={rowData}/>}/>
      </View>
    )
  }
}

