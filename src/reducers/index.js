import {combineReducers} from 'redux'
import user from './user.js'
import runner from './runner.js'
import brewery from './brewery.js'
import circuit from './circuit.js'
import fetchMessage from './fetchMessage.js'

export default combineReducers({
  user,
  runner,
  brewery,
  circuit,
  fetchMessage
})