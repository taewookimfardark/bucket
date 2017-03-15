import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class Album extends Component {

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds
    };
  }

  render() {
    return(
      <View style={{flex: 1, alignItems: 'center'}}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.ds.cloneWithRows(this.props.completedBuckets)}
          enableEmptySections={true}
          renderRow={(rowData) =>

                      <TouchableOpacity style={styles.item} onPress={(e) => {}}>
                        <Image style={{flex: 1, borderRadius: 10}} source={rowData.profileImage ? {uri: rowData.profileImage} : null}/>
                        <View style={{height: 25, position: 'absolute', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, left: 0, right: 0, bottom: 0, backgroundColor: 'black', opacity: 0.7, justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={{fontSize: 10, color: 'white', zIndex: 1}}>{rowData.name}</Text>
                        </View>
                      </TouchableOpacity>}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    width: 110,
    height: 110,
    margin: 3,
    borderRadius: 10
  }
});