import * as actionType from './actionType';

const defaultState = {
	finance: [],
	editingKey: '',
	loading: false
}

const copyState = (state) =>{
	var newState = JSON.stringify(state)
	newState = JSON.parse(newState)
	return newState
}

export default (state = defaultState, action) => {
	var newState = copyState(state)
	switch(action.type){
		case actionType.GET_DAYNOTE:
			newState.finance = action.finance;
			return newState;
		case actionType.SET_DATA:
			newState.finance = action.finance;
			newState.editingKey = action.editingKey;
			return newState;
		default:
			return state;
	}
}