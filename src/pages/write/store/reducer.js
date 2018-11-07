import { fromJS } from 'immutable';
import * as actionType from './actionType';

const defaultState = {
	daynote: [{
		"key": 1,
    	"type": "",
    	"time": "",
    	"things": "",
	    "remark": ""
	},{
		"key": 2,
    	"type": "",
    	"time": "",
    	"things": "",
	    "remark": ""
	},{
		"key": 3,
    	"type": "",
    	"time": "",
    	"things": "",
	    "remark": ""
	},{
		"key": 4,
    	"type": "",
    	"time": "",
    	"things": "",
	    "remark": ""
	},{
		"key": 5,
    	"type": "",
    	"time": "",
    	"things": "",
	    "remark": ""
	},{
		"key": 6,
    	"type": "",
    	"time": "",
    	"things": "",
	    "remark": ""
	},{
		"key": 7,
    	"type": "",
    	"time": "",
    	"things": "",
	    "remark": ""
	},{
		"key": 8,
    	"type": "",
    	"time": "",
    	"things": "",
	    "remark": ""
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