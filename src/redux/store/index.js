//createStore

import { createStore } from 'redux'
import indexReducer from '../reducer'
// import { composeWithDevTools } from 'redux-devtools-extension'

export default ()=> createStore(indexReducer)

