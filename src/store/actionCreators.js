import {CHANGE_INPUT_VAL, ADD_LIST_ITEM, DEL_LIST_ITEM} from './actionTypes';

export const hangeInputVal = (val) => ({
	type: CHANGE_INPUT_VAL,
	val: val
})

export const addListItem = () => ({
	type: ADD_LIST_ITEM
})

export const delListItem = (index) => ({
	type: DEL_LIST_ITEM,
	index: index
})