'use strict'

import React, { Component } from 'react'

import {

} from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './store/index'
import Counter from './pages/Counter'
// import { Navigator } from 'react-native-deprecated-custom-components'
let store = configureStore()

export default class Root extends Component {
	render () {
		return (
			<Provider store={store}>
				<Counter />
			</Provider>
		)
	}
}
