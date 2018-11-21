import * as actionType from './actionType';

const defaultState = {
	editorContent: ''
}

const copyState = (state) =>{
	var newState = JSON.stringify(state)
	newState = JSON.parse(newState)
	return newState
}

export default (state = defaultState, action) => {
	var newState = copyState(state)
	switch(action.type){
		case actionType.CHANGE_CONTENT:
			newState.editorContent = action.html;
			return newState;
		default:
			return state;
	}
}