import { connect } from 'react-redux'
import TabsRoot from './tabsRoot'
import { changeTab } from './navActions'

function mapStateToProps (state) {
  return {
    tabs: state.tabReducer
  }
}

export default connect(
  mapStateToProps,
  {
    changeTab: (route) => changeTab(route)
  }
)(TabsRoot);