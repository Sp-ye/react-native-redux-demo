'use strict'

import React, { Component } from 'react'

import {
	TouchableOpacity,
	StyleSheet,
	View,
	Text
} from 'react-native'
import { connect } from 'react-redux'
// 导入 所需动作
import { addAction, reduceAction, setNumAction1, setNumAction2 } from '../actions/CountAction'

class Counter extends Component {
	// 触发 加的动作
	add = () => {
		this.props.dispatch(addAction())
	}
	// 触发 减的动作
	reduce = () => {
		this.props.dispatch(reduceAction())
	}
	// 触发 设置的动作
	set1 = () => {
		this.props.dispatch(setNumAction1(999))
	}
	// 触发 设置的动作 参数传递方式不一样， 一般为此种
	set2 = () => {
		this.props.dispatch(setNumAction2({
			num: 888
		}))
	}

	render () {
		return (
			<View style={styles.container1}>
				<View style={styles.container2}>
					<TouchableOpacity style={styles.common} onPress={this.reduce}>
						<Text style={styles.btnText}>-</Text>
					</TouchableOpacity>

					<View style={styles.common}>
						<Text>{String(this.props.Count.num)}</Text>
					</View>

					<TouchableOpacity style={styles.common} onPress={this.add}>
						<Text style={styles.btnText}>+</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.container2}>
					<TouchableOpacity style={styles.common} onPress={this.set1}>
						<Text style={styles.btnText}>设置1</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.common} onPress={this.set2}>
						<Text style={styles.btnText}>设置2</Text>
					</TouchableOpacity>
				</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f7f7f7'
	},
	container2: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f7f7f7'
	},
	common: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnText: {
		fontSize: 40
	}
})

function mapStateToProps (state) {
	// 此处的state 就是 reducers文件夹下index.js里配置的对象 rootReducer
	return {
		Count: state.Count
	}
}
// export default connect(mapStateToProps)(Counter)
export default connect(
	state => ({ Count: state.Count })
)(Counter)
/*
* connect接受四个参数
*	connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
*/
