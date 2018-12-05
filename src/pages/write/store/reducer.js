import * as actionType from './actionType';
var moment = require('moment');

const defaultState = {
	daynote: [{
		"key": 1,
    	"type": "",
    	"stime": "",
	    "etime": "",
    	"things": ""
	}],
	editingKey: '',
	loading: false,
	period: [],
	day: moment()
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
			newState.day = action.day;
			return newState;
		case actionType.SET_DATA:
			newState.daynote = action.daynote;
			newState.editingKey = action.editingKey;
			return newState;
		case actionType.INIT_DATE:
			newState.period = action.period;
			return newState;
		default:
			return state;
	}
}