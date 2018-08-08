'use strict'
import { combineReducers } from 'redux'
import { CountReducer } from './CountReducer'

// 我们使用 combineReducers() 将多个 reducer 合并成为一个state
const rootReducer = combineReducers({
	Count: CountReducer
})
export default rootReducer