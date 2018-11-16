import { fromJS } from 'immutable';
import * as actionType from './actionType';

const defaultState = fromJS({
	title: '',
	pubtime: '',
	mood: '',
	weather: '',
	content: '',
	id: ''
})

export default (state = defaultState, action) => {
	switch(action.type){
		case actionType.GET_DETAIL_DATA:
			return state.merge({
				title: action.title, 
				content: action.content, 
				pubtime: action.pubtime,
				mood: action.mood,
				weather: action.weather,
				id: action.id
			});
		default:
			return state;
	}
}