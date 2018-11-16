import { actionTypes } from '.';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	focused: false,
	mouseIn: false,
	currentPage: 1,
	totalPage: 1,
	pageSize: 10,
	list: [],
	activeNav: 0,
	nav: [{
			id:"0",
			name:"首页",
			url:""
		},{
			id:"1",
			name:"事记",
			url:"things"
		},{
			id:"2",
			name:"笔记",
			url:"note"
		},{
			id:"3",
			name:"日记",
			url:"diarys"
		},{
			id:"4",
			name:"财务",
			url:"finance"
		},{
			id:"5",
			name:"账务",
			url:"account"
		},
	]
})

export default (state = defaultState, action) => {
	switch(action.type){
		case actionTypes.FOCUS_SEARCH:
			return state.set("focused", action.focused);
		case actionTypes.BLUR_SEARCH:
			return state.set("focused", action.focused);
		case actionTypes.INIT_SEARCH_INFO_LIST:
			return state.merge({"list": action.list, "pageSize": action.pageSize, "totalPage": action.totalPage});
		case actionTypes.MOUSE_ENTER:
			return state.set("mouseIn", action.mouseIn);
		case actionTypes.MOUSE_LEAVE:
			return state.set("mouseIn", action.mouseIn);
		case actionTypes.CHANGE_NAV:
			return state.set("activeNav", action.activeNav);
		case actionTypes.SWITCH_PAGE:
			return state.set("currentPage", action.currentPage);
		default:
			return state;
	}
}