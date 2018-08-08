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