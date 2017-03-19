import React, {Component} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  NativeModules
} from 'react-native';

import {connect} from 'react-redux';

import DatePicker from 'react-native-datepicker';
import NavigationBar from '../../general/NavigationBar';
import Swiper from 'react-native-swiper';
import colors from '../../general/colors';

import {Actions} from 'react-native-router-flux';

import {bucketImageActionCreators} from '../../bucket-image/bucketImageReducer';

const ImagePicker = NativeModules.ImageCropPicker;

const fullWidth = Dimensions.get('window').width;

class CompleteBucket extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: new Date(),
      completeMessage: '',
      image: null,
      images: null
    };
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false
    }).then(images => {
          for(let i of images) {
            let body = new FormData();
            body.append('file', {uri: i.path, type: i.mime});
            this.props.postBucketImage(this.props.bucket.id, body);
          }
    }).catch(e => alert(e));
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <NavigationBar title="Complete Bucket" backButton={()=>Actions.pop()} completeButton={()=>Actions.pop()}/>
        <View style={{flex: 1}}>
          <Swiper height={200} activeDotColor={colors.colorBackgroundOpacity}>
            <TouchableOpacity style={{flex: 1}} onPress={this.pickMultiple.bind(this)}>
              { !this.props.currentBucketImages ?
                (<View style={{right: 0, left: 0, top: 0, bottom: 0, margin: 10, borderRadius: 10, position: 'absolute', backgroundColor: colors.colorBlackBackgroundOpacity, zIndex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white'}}>+ Add Photo</Text>
                </View>) :
                null
              }
              <Image style={{flex: 1, borderRadius: 10, margin: 10}} source={{uri: this.props.bucket.profileImage}}/>
            </TouchableOpacity>
            {
              this.props.currentBucketImages ?
              this.props.currentBucketImages.map((image) => (
                <TouchableOpacity style={{flex: 1}}>
                  <Image style={{flex: 2, borderRadius: 10, margin: 10}} source={{uri: image}}/>
                </TouchableOpacity>
              )): null
            }
          </Swiper>
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <View style={{height: 50, flexDirection: 'column', borderBottomWidth: 1, borderBottomColor: 'black'}}>
              <Text style={{fontSize: 16}}>{this.props.bucket.title}</Text>
              <DatePicker
                style={{height: 20, width: 80}}
                date={this.state.date}
                showIcon={false}
                mode="date"
                placeholder = {this.state.date}
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={
                  {
                    dateTouchBody: {height: 15, borderWidth: 0, borderColor: 'transparent', backgroundColor: colors.colorBucket, borderRadius: 5},
                    dateInput: {borderWidth: 0, height: 15},
                    placeholderText: {fontSize: 8, color: 'white'},
                    dateText: {fontSize: 8, color: 'white'}
                  }
                }
                onDateChange={(date)=> {
                  this.setState({date: date});
                  console.log(this.state);
                }}/>
            </View>
            <View style={{height: 300, padding: 5}}>
              <View style={{flexDirection: 'row', padding: 10}}>
                <View style={{flex: .1, alignItems: 'center', paddingHorizontal: 5}}>
                  <Image style={{width: 30, height: 30, borderRadius: 15}} source={{uri: this.props.bucket.user.profileImage}}></Image>
                </View>
                <View style={{flex: .9, padding: 5, borderRadius: 5, borderWidth: 0.5, flexDirection: 'row',
                      borderColor: this.state.contentInputFocus ? 'purple' : 'black'}}>
                  <TextInput
                    editable={false}
                    multiline={true}
                    value={this.props.bucket.description}
                    style={{textAlignVertical: 'top', flex: 14, fontSize: 10}}/>
                </View>
              </View>
              <View style={{minHeight: 120, flexDirection: 'row', padding: 10}}>
                <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 5}}>
                  <Image style={{width: 30, height: 30, borderRadius: 15}} source={{uri: this.props.bucket.user.profileImage}}></Image>
                </View>
                <View style={{flex: 9, padding: 5, borderRadius: 5, borderWidth: 0.5, flexDirection: 'row',
                      borderColor: this.state.contentInputFocus ? 'purple' : 'black'}}>
                  <TextInput
                    multiline={true}
                    placeholder='bucket complete reply..'
                    vale={this.state.completeMessage}
                    style={{textAlignVertical: 'top', flex: 14, fontSize: 10}}
                    onChangeText={(text) => this.setState({completeMessage: text})}/>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let bucketImages = state.bucketImage;
  let currentBucketImages = Object.keys(bucketImages).map((id) => bucketImages[id]).filter((image) => image.bucketId === ownProps.bucket.id);
  if(currentBucketImages.length === 0) currentBucketImages = null;
  console.log('current bucket images', currentBucketImages);
  return {
    myData: state.auth.myData,
    currentBucketImages: currentBucketImages
  }
};

const mapDispatchToProps = dispatch => {
  return {
    postBucketImage: (bucketId, body) => dispatch(bucketImageActionCreators.postBucketImage(bucketId, body))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteBucket)

