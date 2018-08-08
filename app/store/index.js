'use strict'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
import thunkMiddleWare from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'

// 配置一些中间键
let middlewares = [
	logger,				// 触发action时候的控制台打印规则
	thunkMiddleWare
]
let createAppStore = applyMiddleware(...middlewares)(createStore)

export default function configureStore (onComplete = () => {}) {
	/* 在reducers里 我们使用 combineReducers() 将多个 reducer 合并成为一个
	*  现在我们将其导入，并传递 createStore()
	*  createStore方法初始化state
	*/
	const store = autoRehydrate()(createAppStore)(rootReducer)
	let opt = {
		storage: AsyncStorage,
		transform: []
	}
	persistStore(store, opt, onComplete)
	return store
}