import { connect } from 'react-redux';
import NavigationRoot from './NavigationRoot';
import * as NavigationActionCreators from './NavigationActionCreators';

function mapStateToProps(state) {
  return {
    navigation: state.navigation
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: route => dispatch(NavigationActionCreators.push(route)),
    popRoute: () => dispatch(NavigationActionCreators.pop())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationRoot)