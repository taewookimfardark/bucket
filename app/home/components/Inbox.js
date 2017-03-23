import React, {Component} from 'react';
import {
  View,
  Text,
  ListView,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import colors from '../../general/colors';

import BucketInbox from './BucketInbox';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  }
});

const fullWidth = Dimensions.get('window').width;

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
      <View style={{flex: 1, paddingTop: 40}}>
        <TouchableOpacity
          style={{position: 'absolute', right: fullWidth * 0.05, top: 10, width: fullWidth * 0.9, borderRadius: 10, height: 30, backgroundColor: colors.colorBucket, justifyContent: 'center', alignItems: 'center'}}
          onPress={()=>Actions.addMembers({group: this.props.group})}
        >
          <Text style={{color: 'white'}}>Add Members</Text>
        </TouchableOpacity>
        <ListView
          dataSource={this.state.ds.cloneWithRows(this.props.requestedBuckets)}
          enableEmptySections={true}
          renderRow={(rowData) => <BucketInbox bucket={rowData}/>}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}/>
      </View>
    )
  }
}