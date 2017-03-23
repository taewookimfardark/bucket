import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Image,
  TextInput,
  ListView
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import constants from '../../general/constants';
import colors from '../../general/colors';
import {bucketImageActionCreators} from '../../bucket-image/bucketImageReducer';
import {commentActionCreators} from '../../comment/commentReducer';

import Comment from '../../comment/components/Comment';


class ShowBucketModal extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds,
      message: ''
    };
  }

  componentWillMount() {
    this.props.getBucketImage(this.props.bucket.id);
    this.props.getComment(this.props.bucket.id);
  }

  bucketImages() {
    let basicImg = (<TouchableWithoutFeedback key={-1} style={{flex: 1, width: this.props.width}}><Image style={{flex: 1, width: this.props.width, borderRadius: 10}} source={{uri: this.props.bucket.profileImage}} key={-1}/></TouchableWithoutFeedback>);
    if(!this.props.currentBucketImages) return basicImg;
    let imageList = this.props.currentBucketImages.map((image) => {
      return (
        <TouchableWithoutFeedback key={image.id} style={{flex: 1, width: this.props.width}}>
          <Image style={{flex: 1, width: this.props.width, borderRadius: 10}} source={{uri: image.servingUrl}}/>
        </TouchableWithoutFeedback>
      )
    });
    return [basicImg, ...imageList];
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <Swiper height={200} activeDotColor={colors.colorBackgroundOpacity}>
          {this.bucketImages()}
        </Swiper>
        <View style={{flex: 1.5, flexDirection: 'row', padding: 10}}>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width: constants.profileS, height: constants.profileS, borderRadius: constants.profileS / 2}} source={{uri: this.props.bucket.user.profileImage}}/>
          </View>
          <View style={{flex: 10, flexDirection: 'column', borderBottomWidth: 0.5, borderBottomColor: colors.colorBackgroundOpacity}}>
            <Text>{this.props.bucket.title}</Text>
            <Text style={{fontSize: 10, color: colors.colorBackgroundOpacity}}>{this.props.bucket.createdString || '-'}</Text>
          </View>
        </View>
        <View style={{flex: 5, flexDirection: 'column'}}>
          <ListView
            dataSource={this.state.ds.cloneWithRows(this.props.commentList)}
            enableEmptySections={true}
            renderRow={(comment) => <Comment width={this.props.width} comment={comment} key={comment.id}/>}
          />
        </View>
        <View style={{flex: 1.5, padding: 10}}>
          <View style={{flex: 1, borderWidth: 0.5, borderColor: colors.colorBackgroundOpacity, borderRadius: 5, padding: 5}}>
            <TextInput style={{flex: 1}}
                       value={this.state.message}
                       onChangeText={(text) => this.setState({message: text})}
                       placeholder="Reply message..."/>
            <TouchableOpacity
              onPress={()=> {
                const commentObj = {
                  bucketId: this.props.bucket.id,
                  message: this.state.message
                };
                this.setState({message: ''});
                this.props.postComment(commentObj);
              }}
              style={{position: 'absolute', right: 5, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="md-checkmark" size={20}/>
            </TouchableOpacity>
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

  let comments = state.comment;
  let commentList = Object.keys(comments).map(id => {
    let date = new Date(comments[id].created * 1000);
    let dateString = `${date.getFullYear()} / ${date.getMonth()+1} / ${date.getDate()}`;
    comments[id].createdString = dateString;
    return comments[id];
  }).filter((comment) => comment.bucketId === ownProps.bucket.id);
  return{
    ...ownProps,
    currentBucketImages: currentBucketImages,
    commentList: commentList
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getBucketImage: (bucketId) => dispatch(bucketImageActionCreators.getBucketImage(bucketId)),
    getComment: (bucketId) => dispatch(commentActionCreators.getComment(bucketId)),
    postComment: (comment) => dispatch(commentActionCreators.postComment(comment))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowBucketModal)