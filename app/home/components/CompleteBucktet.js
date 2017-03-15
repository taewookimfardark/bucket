import React, {Component} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';

import {connect} from 'react-redux';

import DatePicker from 'react-native-datepicker';
import NavigationBar from '../../general/NavigationBar';
import Swiper from 'react-native-swiper';
import colors from '../../general/colors';

import {Actions} from 'react-native-router-flux';

// var ImagePicker = NativeModules.ImageCropPicker;

const fullWidth = Dimensions.get('window').width;

class CompleteBucket extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      data: '',
      image: null,
      images: null
    }
  }


  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <NavigationBar title="Complete Bucket" backButton={()=>Actions.pop()} completeButton={()=>Actions.pop()}/>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Swiper style={{}} height={200} activeDotColor={colors.colorBackgroundOpacity}>
            <TouchableOpacity style={{flex: 1}}>
              <Image style={{flex: 2, borderRadius: 10, margin: 10}} source={{uri: this.props.bucket.profileImage}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1}}>
              <Image style={{flex: 2, borderRadius: 10, margin: 10}} source={{uri: this.props.bucket.profileImage}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1}}>
              <Image style={{flex: 2, borderRadius: 10, margin: 10}} source={{uri: this.props.bucket.profileImage}}/>
            </TouchableOpacity>
          </Swiper>
          <View style={{flex: 1, backgroundColor: 'blue', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <Image style={{height: 30, width: 30, borderRadius: 50}} source={{uri: this.props.bucket.profileImage}}/>
            <View>
              <DatePicker
                style={{width: 100}}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={()=> this.setState({date: date})}/>
            </View>
          </View>
          <View style={{flex: 4, backgroundColor: 'lime', flexDirection: 'column', padding: 10}}>
            <View style={{width: fullWidth, height: 120, flexDirection: 'row'}}>
              <View style={{flex: .1, alignItems: 'center'}}>
                <Image style={{width: 30, height: 30, borderRadius: 15}} source={{uri: this.props.bucket.user.profileImage}}></Image>
              </View>
              <View style={{flex: .9, padding: 5, borderRadius: 5, borderWidth: 0.5, flexDirection: 'row',
                      borderColor: this.state.contentInputFocus ? 'purple' : 'black'}}>
                <TextInput
                  multiline={true}
                  value={this.props.bucket.description}
                  style={{textAlignVertical: 'top', flex: 14, fontSize: 10}}/>
              </View>
            </View>
            <View style={{width: fullWidth, height: 120, flexDirection: 'row'}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Image style={{width: 30, height: 30, borderRadius: 15}} source={{uri: this.props.bucket.user.profileImage}}></Image>
              </View>
              <View style={{flex: 9, padding: 5, borderRadius: 5, borderWidth: 0.5, flexDirection: 'row',
                      borderColor: this.state.contentInputFocus ? 'purple' : 'black'}}>
                <TextInput
                  multiline={true}
                  value={this.props.bucket.description}
                  style={{textAlignVertical: 'top', flex: 14, fontSize: 10}}/>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    myData: state.auth.myData,
  }
};

export default connect(mapStateToProps)(CompleteBucket)

