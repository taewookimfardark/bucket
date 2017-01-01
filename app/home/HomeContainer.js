import {connect} from 'react-redux';
import ViewPager from 'react-native-viewpager';
import Home from './Home';

const mapStateToProps = (state, ownProps) => {
  var rawDataSource = [
    {
      type: 'album',
      title: 'Album'
    },
    {
      type: 'homePage',
      title: 'HomePage'
    },
    {
      type: 'inbox',
      title: 'Inbox'
    }
  ];

  var dataSource = new ViewPager.DataSource({
    pageHasChanged: (p1, p2) => p1 !== p2
  });

  return {
    rawDataSource,
    dataSource: dataSource.cloneWithPages(rawDataSource)
  }
};

export default connect(mapStateToProps)(Home)