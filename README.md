# react-native-redux-demo
做个简单的Demo 说明下如何使用

此文档为简单的Redux Demo 计数器应用
============================
## 相关文档
### Redux中文文档： http://www.redux.org.cn/
### ES6中文文档：   http://es6.ruanyifeng.com/
### ES7&ES8特性：   https://www.jianshu.com/p/a138a525c287
---

## 开始
### 1. 使用前得需要安装
```
npm install
```
    

### 2. 创建actions
```javascript
// app/actions/CountAction.js

import * as Types from '../config/Types'
// +1操作
export function addAction () {
	return {
		type: Types.ADD
	}
}

// -1操作
export function reduceAction () {
	return {
		type: Types.REDUCE
	}
}
// setNumAction1 和 setNumAction2 区别只是接受的参数类型不一样，此处无区别，区别在reducer内
// 指定值
export function setNumAction1 (params) {
	// params 可以为任何类型，一般为对象
	return {
		type: Types.SETNUM1,
		data: params
	}
}

// 指定值
export function setNumAction2 (params) {
	// params 可以为任何类型，一般为对象
	return {
		type: Types.SETNUM2,
		data: params
	}
}
```
### 3. 创建Types
```javascript
// app/config/Types.js

export const ADD = 'ADD'
export const REDUCE = 'REDUCE'
export const SETNUM1 = 'SETNUM1'
export const SETNUM2 = 'SETNUM2'
```
 
### 4. 创建reducers相关
```javascript
// app/reducers/CountReducer.js

'use strict'
import * as Types from '../config/Types'

export const initialState = {
	num: 0
}
export function CountReducer (state = initialState, action) {
	switch (action.type) {
		case Types.ADD:
			return {
				num: ++state.num
			}
		case Types.REDUCE:
			return {
				num: --state.num
			}
		case Types.SETNUM1:
			return {
				num: action.data
			}
		case Types.SETNUM2:
			return {
				num: action.data.num
			}
		default:
			return state
	}
}
```

```javascript
// app/reducers/index.js

'use strict'
import { combineReducers } from 'redux'
import { CountReducer } from './CountReducer'

// 我们使用 combineReducers() 将多个 reducer 合并成为一个state
const rootReducer = combineReducers({
	Count: CountReducer
})
export default rootReducer
```


### 5. 初始化store
```javascript
// app/store/index.js

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
```
### 6. 注入store
```javascript
// app/Root.js

'use strict'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/index'
import Counter from './pages/Counter'
// import { Navigator } from 'react-native-deprecated-custom-components'
let store = configureStore()

export default class Root extends Component {
	render () {
		return (
			<Provider store={store}>
				<Counter/>
			</Provider>
		)
	}
}

```
---

## API部分

### connect函数
连接 React 组件与 Redux store
连接操作不会改变原来的组件类，反而返回一个新的已与 Redux store 连接的组件类

connect()函数接受四个参数
```
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
```


 - mapStateToProps
    [mapStateToProps(state, [ownProps]): stateProps] (Function): 如果定义该参数，组件将会监听 Redux store 的变化。任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。如果你省略了这个参数，你的组件将不会监听 Redux store。如果指定了该回调函数中的第二个参数 ownProps，则该参数的值为传递到组件的 props，而且只要组件接收到新的 props，mapStateToProps 也会被调用（例如，当 props 接收到来自父组件一个小小的改动，那么你所使用的 ownProps 参数，mapStateToProps 都会被重新计算）。

 - mapDispatchToProps
    [mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function): 如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，对象所定义的方法名将作为属性名；每个方法将返回一个新的函数，函数中dispatch方法会将action creator的返回值作为参数执行。这些属性会被合并到组件的 props 中。
 - mergeProps **（目前没用过）**
    [mergeProps(stateProps, dispatchProps, ownProps): props] (Function): 如果指定了这个参数，mapStateToProps() 与 mapDispatchToProps() 的执行结果和组件自身的 props 将传入到这个回调函数中。该回调函数返回的对象将作为 props 传递到被包装的组件中。你也许可以用这个回调函数，根据组件的 props 来筛选部分的 state 数据，或者把 props 中的某个特定变量与 action creator 绑定在一起。如果你省略这个参数，默认情况下返回 Object.assign({}, ownProps, stateProps, dispatchProps) 的结果。
 - options
    1. [pure = true] (Boolean): 如果为 true，connector 将执行 shouldComponentUpdate 并且浅对比 mergeProps 的结果，避免不必要的更新，前提是当前组件是一个“纯”组件，它不依赖于任何的输入或 state 而只依赖于 props 和 Redux store 的 state。默认值为 true
    2. [withRef = false] (Boolean): 如果为 true，connector 会保存一个对被包装组件实例的引用，该引用通过 getWrappedInstance() 方法获得。默认值为 false

标签: 注意：
    如果定义一个包含强制性参数函数（这个函数的长度为 1）时，ownProps 不会传到 mapStateToProps 和 mapDispatchToProps 中。举个例子，如下这样定义一个函数时将不会接收到 ownProps 作为第二个参数。
#### 例子： 

```javascript
function mapStateToProps (state) {
    console.log(state); // state
    console.log(arguments[1]); // undefined
}
```
```javascript
const mapStateToProps = (state, ownProps = {}) => {
    console.log(state); // state
    console.log(ownProps); // undefined
}
```
```javascript
const mapStateToProps = (state, ownProps) => {
    console.log(state); // state
    console.log(ownProps); // ownProps
}
```
```javascript
function mapStateToProps() {
    console.log(arguments[0]); // state
    console.log(arguments[1]); // ownProps
}
```
```javascript
const mapStateToProps = (...args) => {
    console.log(args[0]); // state
    console.log(args[1]); // ownProps
}
```

```javascript
export default connect(mapStateToProps)(Counter)
```





---

### 写法介绍
ES7以下
```javascript
// 导入 所需动作
import { addAction, reduceAction } from '../actions/CountAction'

class Counter extends Component {
    // 触发 加的动作
	add = () => {
		this.props.dispatch(addAction())
	}
    ...
}

function mapStateToProps (state) {
	return {
		Count: state.Count
	}
}
export default connect(mapStateToProps)(Counter)
```
```javascript
// 导入 所需动作
import { addAction, reduceAction } from '../actions/CountAction'

class Counter extends Component {
    // 触发 加的动作
	add = () => {
		this.props.dispatch(addAction())
	}
    ...
}

export default connect(
    state => ({ Count: state.Count })
)(Counter)
```

ES7
需先安装
```
npm install —save-dev babel-plugin-transform-decorators-legacy
```
然后在.babelrc 文件加上`"plugins": ["transform-decorators-legacy"]` 把装饰器(@)语法转成es5
```
{
  "presets": ["react-native"],
  "plugins": ["transform-decorators-legacy"]
}

```
```javascript
// 导入 所需动作
import { addAction, reduceAction } from '../actions/CountAction'

// 此写法 connect 与 class之间不能插入其他代码
@connect(
	state => ({
    	Count: state.Count
	}),
	dispatch => ({
		...bindActionCreators({ add, reduce }, dispatch)
	})
)

export class Counter extends Component {
    // 触发 加的动作
	add = () => {
		this.props.addAction()
	}
	render () {
		return (
			<View style={styles.container1}>
			</View>
		)
	}
}
```

------

### 如有疑问可以找朱云枫和施炜鹏同事咨询。
### 以下备注说明都为个人开发经验，有错望斧正。


