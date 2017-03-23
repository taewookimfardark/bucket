import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import colors from '../general/colors'


const TabBar = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({ value, }) {
    this.tabIcons.forEach((icon, i) => {
      const progress = Math.min(1, Math.abs(value - i));
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  },

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  render() {
    return <View style={[styles.tabs, this.props.style,]}>
      <TouchableOpacity onPress={()=> this.props.goToPage(0)} style={{borderBottomWidth: 1, borderBottomColor: this.props.activeTab === 0 ? colors.colorBucket : 'transparent'}}>
        <Image
          style={{width: 40, height: 40}}
          source={require('../general/image/album_icon.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.props.goToPage(1)} style={{borderBottomWidth: 1, borderBottomColor: this.props.activeTab === 1 ? colors.colorBucket : 'transparent', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{textAlignVertical: 'bottom', textAlign: 'center', fontSize: 20, color: colors.colorBucket}}>Do.With</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.props.goToPage(2)} style={{borderBottomWidth: 1, borderBottomColor: this.props.activeTab === 2 ? colors.colorBucket : 'transparent'}}>
        <Image
          style={{width: 40, height: 40, paddingBottom: 10}}
          source={require('../general/image/inbox_icon.png')}
        />
      </TouchableOpacity>
    </View>;
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});

export default TabBar;