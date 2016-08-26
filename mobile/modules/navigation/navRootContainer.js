import { connect } from 'react-redux'
import NavigationRoot from './navRoot'
import { push, pop } from './navActions'

function mapStateToProps(state) {
    return {
        navigation: state.navReducer,
        notifications: state.notifications,
        isLoggedIn: state.user && (state.user.isLoggedIn || state.user.hasSkippedLogin),
    };
}

// function mapDispatchToProps(dispatch) {
//     return {
//         pushRoute: (route) => push(route),
//         popRoute: () => pop()
//     }
// }

export default connect(
    mapStateToProps,
    {
        pushRoute: (route) => push(route),
        popRoute: () => pop()
    }
    //mergeProps
)(NavigationRoot);