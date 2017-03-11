import React, {Component} from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  PixelRatio,
  StyleSheet,
  Dimensions,
  ListView
} from 'react-native';

import {groupActionCreators} from './groupReducer';
import {connect} from 'react-redux';

import Header from '../general/Header';
import colors from '../general/colors';

import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

class Group extends Component {

  constructor(props) {
    super(props);

    this.props.getGroup();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      ds: ds
    };
  }

  render(){
    return(
      <View style={{flex: 1}}>
        <Header headerName="My Groups"/>

        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.ds.cloneWithRows(Object.keys(this.props.groups).map((id) => this.props.groups[id]))}
          enableEmptySections={true}
          renderRow={(rowData) =>
                      <TouchableOpacity style={styles.item} onPress={(e) => Actions.tabbar({groupId: rowData.id})}>
                        <Image style={{flex: 1, borderRadius: 10}} source={rowData.profileImage ? {uri: rowData.profileImage} : null}/>
                        <View style={{height: 25, position: 'absolute', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, left: 0, right: 0, bottom: 0, backgroundColor: 'black', opacity: 0.7, justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={{fontSize: 10, color: 'white', zIndex: 1}}>{rowData.name}</Text>
                        </View>
                      </TouchableOpacity>}
          renderFooter={() =>
            <TouchableOpacity style={styles.addGroup} onPress={(e) => Actions.addGroup()}>
              <Icon name="md-add" color="white" size={35}/>
            </TouchableOpacity>}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    margin: 3,
    width: 180,
    height: 180,
    borderRadius: 10
  },
  addGroup: {
    margin: 3,
    width: 180,
    height: 180,
    borderRadius: 10,
    backgroundColor: colors.colorBucket,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    groups: state.group
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getGroup : () => {dispatch(groupActionCreators.getGroup())}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Group)