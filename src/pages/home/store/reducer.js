import { fromJS } from 'immutable';
import * as actionType from './actionType';

const defaultState = fromJS({
	temperture:{
		"peired":"",
		"temperture1": [[]],
		"temperture2": [[]]
	},
	backTopShow:false,
	data:[]
})

export default (state = defaultState, action) => {
	switch(action.type){
		case actionType.GET_INIT_HOMR_DATA:
			return state.set("temperture", action.temperture);
		case actionType.IS_SHOW_BACKTOPBTN:
			return state.set("backTopShow", action.backTopShow);
		case actionType.CHANGE_SLIDETO:
			return state.set("slideTo", action.slideTo);
		case actionType.SET_INIT_DATA:
			return state.set("data", action.data);
		default:
			return state;
	}
}