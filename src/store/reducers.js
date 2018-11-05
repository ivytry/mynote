import {CHANGE_INPUT_VAL, ADD_LIST_ITEM, DEL_LIST_ITEM} from './actionTypes';

const defaultState = {
	inputVal: "hello world",
	list: [1, 2, 3]
}

const reducers = (state = defaultState, action) =>{
	const newState = JSON.parse(JSON.stringify(state));
	if(action.type === CHANGE_INPUT_VAL){
		newState.inputVal = action.val
	}
	if(action.type === ADD_LIST_ITEM){
		newState.list.push(newState.inputVal)
		newState.inputVal = ""
	}
	if(action.type === DEL_LIST_ITEM){
		newState.list.splice(action.index, 1)
	}
	return newState
}

export default reducers;