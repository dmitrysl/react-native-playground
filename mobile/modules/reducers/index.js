import { combineReducers } from 'redux'
import navReducer from '../navigation/navReducer'
import tabReducer from './tabReducers'

const rootReducer = combineReducers({
  tabReducer,
  navReducer
});

export default rootReducer;