import { connect } from 'react-redux'
import NavigationRoot from './navRoot'
import { push, pop } from './navActions'

function mapStateToProps (state) {
  return {
    navigation: state.navReducer
   };
}

export default connect(
  mapStateToProps,
   {
     pushRoute: (route) => push(route),
     popRoute: () => pop()
   }
)(NavigationRoot);