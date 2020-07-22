import {combineReducers} from 'redux'
import user from './user.js'
import brewery from './brewery.js'
import circuit from './circuit.js'
import review from './review.js'
import notification from './notification.js'
import fetchMessage from './fetchMessage.js'

export default combineReducers({
  user,
  brewery,
  circuit,
  review,
  notification,
  fetchMessage
})