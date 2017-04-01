import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ListView,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import NavigationBar from '../../general/NavigationBar.ios';

import {userActionCreators} from '../../user/userReducer';
import {groupActionCreators} from '../../group/groupReducer';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  }
});

class AddMembers extends Component {

  componentWillMount(){
    this.props.getUsers();
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds
    };
  }

  addMember(userId, groupId){
    const member = {
      userId: userId,
      groupId: groupId,
      status: 'ACCEPTED'
    };
    this.props.addGroupMembers(member);
  }

  render(){
    return(
      <View style={{flex: 1}}>
        <NavigationBar title="Add Members" backButton={Actions.pop} completeButton={Actions.pop}/>
        <ListView
          dataSource={this.state.ds.cloneWithRows(this.props.users.filter(user => user.status === 'REJECTED'))}
          enableEmptySections={true}
          renderRow={(user)=>
          <View style={{flex: 1, height: 60, flexDirection: 'row'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image style={{width: 30, height: 30, borderRadius: 15}} source={{uri: user.profileImage}}/>
            </View>
            <View style={{flex: 4, paddingLeft: 10, justifyContent: 'center'}}>
              <Text>{user.email}</Text>
            </View>
            <TouchableOpacity
              style={{position: 'absolute', right: 10, top: 15, width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}
              onPress={()=> this.addMember(user.id, this.props.group.id)}>
              <Text style={{fontSize: 24}}>+</Text>
            </TouchableOpacity>
          </View>
          }
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}/>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let groupMembers = ownProps.group.members;
  let userList;
  if(!state.users) userList = [];
  else {
    userList = Object.keys(state.users).map((id)=>{
      let userObj = {...state.users[id]};
      let isMember = false;
      for(let member of groupMembers){
        if(userObj.id === member.id) isMember = true;
      }
      if(isMember) userObj.status = 'ACCEPTED';
      else userObj.status = 'REJECTED';
      return userObj;
    });
  }
  return {
    users: userList
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {dispatch(userActionCreators.getUsers())},
    addGroupMembers: (member) => {dispatch(groupActionCreators.addGroupMembers(member))}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMembers)