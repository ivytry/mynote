import * as actionType from './actionType';

const defaultState = {
	finance: [],
	editing: false,
	loading: false,
	searchText: '',
	chartVisible: false,
	allTotal: [],
	monthTotal: [],
	yearTotal: []
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
			newState.editing = action.editing;
			return newState;
		case actionType.SET_SEARCHDATA:
			newState.searchText = action.searchText;
			return newState;
		case actionType.SET_CHARTVISIBLE:
			newState.chartVisible = action.chartVisible;
			return newState;
		case actionType.SET_ALLTOTAL:
			newState.allTotal = action.allTotal;
			return newState;
		case actionType.SET_MONTHTOTAL:
			newState.monthTotal = action.monthTotal;
			return newState;
		case actionType.SET_YEARTOTAL:
			newState.allTotal = action.allTotal;
			return newState;
		default:
			return state;
	}
}