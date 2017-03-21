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
import {bucketActionCreators} from '../../bucket/bucketReducer';

const ImagePicker = NativeModules.ImageCropPicker;

class CompleteBucket extends Component {

  constructor(props) {
    super(props);
    this.state = {
      completeDate: new Date(),
      completeMessage: '',
      image: null,
      images: null
    };
  }

  componentWillMount() {
    this.props.getBucketImage(this.props.bucket.id);
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false
    }).then( (images) => {
          let bodyList = [];
          for(let i of images) {
            let body = new FormData();
            let fileName = i.path.split('/')[i.path.split('/').length-1].split('.')[0];
            body.append('file', {uri: `file://${i.path}`, type: 'multipart/form-data', name: fileName});
            bodyList.push(body);
          }
      this.props.postBucketImage(this.props.bucket.id, bodyList);
    }).catch(e => alert(e));
  }

  bucketImages() {
    let basicImg = (
      <TouchableOpacity style={{flex: 1}} onPress={this.pickMultiple.bind(this)} key={-1}>
        { !this.props.currentBucketImages ?
          (<View style={{right: 0, left: 0, top: 0, bottom: 0, margin: 10, borderRadius: 10, position: 'absolute', backgroundColor: colors.colorBlackBackgroundOpacity, zIndex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>+ Add Photo</Text>
          </View>) :
          null
        }
        <Image style={{flex: 1, borderRadius: 10, margin: 10}} source={{uri: this.props.bucket.profileImage}}/>
      </TouchableOpacity>
    );
    if(!this.props.currentBucketImages) return basicImg;
    let imageList = this.props.currentBucketImages.map((image) => {
      return (
        <TouchableOpacity style={{flex: 1}} onPress={this.pickMultiple.bind(this)} key={image.id}>
          <Image style={{flex: 1, borderRadius: 10, margin: 10}} source={{uri: image.servingUrl}}/>
        </TouchableOpacity>
      )
    });
    return [basicImg, ...imageList];
  }

  completeBucket() {
    const completeBucketObj = {
      completeDate: this.state.completeDate.getTime() / 1000,
      status: 'COMPLETED',
      completeMessage: this.state.completeMessage,
      completeMessageUserId: this.props.myData.id
    };
    this.props.completeBucket(this.props.bucket.id, completeBucketObj);
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <NavigationBar title="Complete Bucket" backButton={()=>Actions.pop()} completeButton={this.completeBucket.bind(this)}/>
        <View style={{flex: 1}}>
          <Swiper height={200} activeDotColor={colors.colorBackgroundOpacity}>
            {this.bucketImages()}
          </Swiper>
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <View style={{height: 50, flexDirection: 'column', borderBottomWidth: 1, borderBottomColor: 'black'}}>
              <Text style={{fontSize: 16}}>{this.props.bucket.title}</Text>
              <DatePicker
                style={{height: 20, width: 80}}
                date={this.state.completeDate}
                showIcon={false}
                mode="date"
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
                  this.setState({completeDate: date});
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
  return {
    myData: state.auth.myData,
    currentBucketImages: currentBucketImages
  }
};

const mapDispatchToProps = dispatch => {
  return {
    postBucketImage: (bucketId, imageArr) => dispatch(bucketImageActionCreators.postBucketImage(bucketId, imageArr)),
    getBucketImage: (bucketId) => dispatch(bucketImageActionCreators.getBucketImage(bucketId)),
    completeBucket: (bucketId, params) => dispatch(bucketActionCreators.updateBucket(bucketId, params))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteBucket)

