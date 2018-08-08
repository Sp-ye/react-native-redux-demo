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