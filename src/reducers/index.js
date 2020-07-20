import {combineReducers} from 'redux'
import user from './user.js'
import brewery from './brewery.js'
import circuit from './circuit.js'

export default combineReducers({
  user,
  brewery,
  circuit
})