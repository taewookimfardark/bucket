import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import colors from '../../general/colors';

import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import NavigationBar from '../../general/NavigationBar.ios';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {imageActionCreators} from '../../image/imageReducer';
import {bucketActionCreators} from '../../bucket/bucketReducer';

const fullWidth = Dimensions.get('window').width;

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      titleInputFocus: false,
      urlInputFocus: false,
      contentInputFocus: false,
      bucketTitle: '',
      bucketDescription: '',
    }
  }

  componentWillMount() {
    console.log('component will mount');
  }

  componentDidMount() {
    console.log('component will mount');
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        let body = new FormData();
        body.append('file', {uri: response.uri, name: response.fileName, type: 'multipart/form-data'});
        this.props.postImage(body);

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  createBucket() {
    const bucketObj = {
      title: this.state.bucketTitle,
      description: this.state.bucketDescription,
      profileImage: this.props.uploadedImage.servingUrl,
      profileImageId: this.props.uploadedImage.id,
      groupId: this.props.groupId,
      userId: this.props.myData.id
    };
    console.log('post bucket');
    this.props.postBucket(bucketObj);
  }

  render() {
    return(
      <View style={{flex: 1, flexDirection: 'column'}}>
        <NavigationBar title='New Bucket'
                       backButton={()=>{
                         this.props.setImage(null);
                         this.setState({
                           bucketTitle: '',
                           bucketDescription: ''
                         });
                         Actions.home();
                       }}
                       completeButton={this.createBucket.bind(this)}/>
        <View style={{flex: 1, flexDirection: 'column', padding: 20}}>
          <View style={{flex: 3, height: 200, borderRadius: 10, position: 'relative', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={{flex: 1, borderRadius: 10}}>
              {this.props.uploadedImage ? <Image style={{height: 200, flex: 1, borderRadius: 10, zIndex: 1}}
                                                 resizeMode='stretch'
                                                 source={{uri: this.props.uploadedImage.servingUrl}}/> :
                                          <View style={{flex: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.colorBucketOpacity}}><Text style={{color: 'white'}}>Add Bucket +</Text></View>}
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.5,  padding: 5}}>
            <View style={{height: 30, width: fullWidth - 50, borderBottomWidth: 1, borderBottomColor: this.state.titleInputFocus ? 'purple' : 'black'}}>
              <TextInput
                style={{height: 35, width: fullWidth - 50, textAlignVertical: 'bottom', fontSize: 10}}
                onFocus={()=>this.setState({titleInputFocus: true})}
                onBlur={()=>this.setState({titleInputFocus: false})}
                underlineColorAndroid='transparent'
                placeholder="New Bucket Title.."
                onChangeText={(text) => this.setState({bucketTitle: text})}
                value={this.state.bucketTitle}/>
            </View>
          </View>
          <View style={{flex: 3, flexDirection: 'row', padding: 10}}>
            <View style={{flex: 1.5, alignItems: 'center'}}>
              <Image style={{width: 20, height: 20, borderRadius: 10}} source={{uri: this.props.myData.profileImage}}></Image>
            </View>
            <View style={{flex: 10, padding: 5, borderRadius: 5, borderWidth: 0.5, flexDirection: 'row',
                      borderColor: this.state.contentInputFocus ? 'purple' : 'black'}}>
              <TextInput
                multiline={true}
                underlineColorAndroid='transparent'
                placeholder="Content"
                onFocus={()=>this.setState({contentInputFocus: true})}
                onBlur={()=>this.setState({contentInputFocus: false})}
                onChangeText={(text) => this.setState({bucketDescription: text})}
                value={this.state.bucketDescription}
                style={{textAlignVertical: 'top', flex: 14, fontSize: 10}}/>
            </View>
          </View>
          <View style={{flex: 4}}>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('register', state);
  return {
    ...ownProps,
    uploadedImage: state.image.uploadedImage,
    myData: state.auth.myData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    postImage : (body) => {dispatch(imageActionCreators.postImage(body))},
    postBucket : (bucketObj) => {dispatch(bucketActionCreators.postBucket(bucketObj))},
    setImage : (image) => {dispatch(imageActionCreators.setImage(image))}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)