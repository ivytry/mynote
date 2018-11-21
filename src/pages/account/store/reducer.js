import * as actionType from './actionType';

const defaultState = {
	daynote: [{
		"key": 1,
    	"type": "",
    	"stime": "",
	    "etime": "",
    	"things": ""
	}],
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
			newState.daynote = action.daynote;
			return newState;
		case actionType.SET_DATA:
			newState.daynote = action.daynote;
			newState.editingKey = action.editingKey;
			return newState;
		default:
			return state;
	}
}