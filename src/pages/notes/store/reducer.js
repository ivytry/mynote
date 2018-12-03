import * as actionType from './actionType';

const defaultState = {
	editingKey: '',
	loading: false,
	diarys: [
	  {
	  	id: '4789155363',
	    title: '树和豆芽的故事',
	    content: '晚秋时节，我去大街散步，只见一棵棵大树光秃着枝丫;遍地的落叶，踩在脚下，沙沙作响。',
	    pubtime: '2018/11/15 15:48',
	    mood: "&#xe64f;",
	    weather: "&#xe611;"
	  },
	  {
	  	id: '4789155363',
	    title: '江边城外',
	    content: '我捡起一片落叶，仔细观察，见上面叶脉分明，像极了大树的身影。难道这片片落叶就是大树母亲撒落的照片吗?我想，是的。',
	    pubtime: '2018/11/15 15:48',
	    mood: "&#xe6dc;",
	    weather: "&#xe606;"
	  },
	  {
	  	id: '4789155363',
	    title: '流浪猫',
	    content: '树叶是大树母亲的儿女，是母亲用自己的乳汁哺育着她们，从发芽到绽放，到变成一片片成熟硕大的叶子，在树叶的身上自然也就镌刻上了大树母亲自己的身影。',
	    pubtime: '2018/11/15 15:48',
	    mood: "&#xe64b;",
	    weather: "&#xe60d;"
	  },
	  {
	  	id: '4789155363',
	    title: '我是美芽，啦啦啦啦啦啦',
	    content: '树叶是大树母亲的亲生儿女，但她们知道自己并不是母亲最喜欢最想要的，母亲更喜欢自己另外的儿女——鲜花和果实。树叶们深知自己的使命，时时刻刻和母亲一道呵护着娇嫩的鲜花，滋养着香甜的果实。',
	    pubtime: '2018/11/15 15:48',
	    mood: "&#xe782;",
	    weather: "&#xe611;"
	  },
	]
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