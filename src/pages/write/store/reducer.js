import { fromJS } from 'immutable';
import * as actionType from './actionType';

const defaultState = fromJS({
	daynote: [{
    	"type": "",
    	"time": "",
    	"things": "",
	},{
    	"type": "",
    	"time": "",
    	"things": "",
	},{
    	"type": "",
    	"time": "",
    	"things": "",
	},{
    	"type": "",
    	"time": "",
    	"things": "",
	},{
    	"type": "",
    	"time": "",
    	"things": "",
	},{
    	"type": "",
    	"time": "",
    	"things": "",
	},{
    	"type": "",
    	"time": "",
    	"things": "",
	},{
    	"type": "",
    	"time": "",
    	"things": "",
	}],
	editingKey: ''
})

export default (state = defaultState, action) => {
	switch(action.type){
		case actionType.GET_DAYNOTE:
			return state.set("daynote", action.daynote);
		default:
			return state;
	}
}