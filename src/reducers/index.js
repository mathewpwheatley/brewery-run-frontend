import {combineReducers} from 'redux';
import endPoints from './endPoints.js'
import user from './user.js'

export default combineReducers({
  endPoints,
  user
});