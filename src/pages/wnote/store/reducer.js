import * as actionType from './actionType';

const defaultState = {
	editorContent: '',
	title: '',
	time: '',
	mood: '',
	weather: ''
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
		case actionType.CHANGE_TITLE:
			newState.title = action.title;
			return newState;
		case actionType.CHANGE_WEATHER:
			newState.weather = action.weather;
			return newState;
		case actionType.CHANGE_MOOD:
			newState.mood = action.mood;
			return newState;
		case actionType.CHANGE_TIME:
			newState.time = action.time;
			return newState;
		case actionType.INIT_CONTENT:
			newState.title = action.title;
			newState.editorContent = action.editorContent;
			newState.time = action.time;
			newState.mood = action.mood;
			newState.weather = action.weather;
			return newState;
		default:
			return state;
	}
}