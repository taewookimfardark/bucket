import React, {Component} from 'react';
import {
  View,
  Text,
  ListView,
  Image,
  StyleSheet,
  Modal
} from 'react-native';

import colors from '../../general/colors';

import BucketInbox from './BucketInbox';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  }
});

export default class Inbox extends Component {

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds
    };
  }


  render() {
    return(
      <View style={{flex: 1}}>
        <ListView
          dataSource={this.state.ds.cloneWithRows(this.props.requestedBuckets)}
          enableEmptySections={true}
          renderRow={(rowData) => <BucketInbox bucket={rowData}/>}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}/>
      </View>
    )
  }
}