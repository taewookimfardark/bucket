import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Modal
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import NavigationBar from '../../general/NavigationBar';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmText: '',
      confirmVisible: false
    }
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.confirmVisible}
          onRequestClose = {()=> this.setState({confirmVisible: false, confirmText: ''})}>
          <View style={{flex: 1, backgroundColor: 'rgba(10,10,10, 0.7)', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{height: 200, width: 400, margin: 30, backgroundColor: 'white', opacity: 1, borderRadius: 10, flexDirection: 'column'}}>
              <View style={{flex: 2, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center'}}>{this.state.confirmText}</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                  onPress={()=>{
                    this.setState({confirmVisible: false, confirmText: ''});
                  }}>
                  <Text>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                  onPress={()=>{
                    this.setState({confirmVisible: false, confirmText: ''});
                    Actions.auth();
                  }}>
                  <Text>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <NavigationBar backButton={()=>Actions.home()} completeButton={()=>Actions.home()}/>
        <View style={{flex: 1, margin: 15, backgroundColor: 'grey', opacity: 0.6, flexDirection: 'column'}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{borderRadius: 50, width: 90, height: 90}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}></Image>
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TextInput style={{width: 300}} placeholder="Nickname"/>
            </View>
            <View style={{flex: 3, margin: 10, backgroundColor: 'white', borderRadius: 10, flexDirection: 'column'}}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{flex: 2, textAlign: 'center'}}>Name</Text><TextInput style={{flex: 8, textAlignVertical: 'bottom'}} placeholder="Name"/>
              </View>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{flex: 2, textAlign: 'center'}}>Gender</Text><TextInput style={{flex: 8, textAlignVertical: 'bottom'}} placeholder="Gender"/>
              </View>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{flex: 2, textAlign: 'center'}}>E-mail</Text><TextInput style={{flex: 8, textAlignVertical: 'bottom'}} placeholder="E-mail"/>
              </View>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <TouchableOpacity
              style={{flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}
              onPress={()=>Actions.editPassword()}>
              <Text>Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}
              onPress={()=>this.setState({confirmVisible: true, confirmText: 'Really Log out?'})}>
              <Text>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}
              onPress={()=>this.setState({confirmVisible: true, confirmText: 'Really Destroy?'})}>
              <Text>Destroy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}