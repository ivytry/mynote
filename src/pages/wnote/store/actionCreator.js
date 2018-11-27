import axios from 'axios';
import * as actionType from './actionType';

const initContent = (data) => ({
	type: actionType.INIT_CONTENT,
	editorContent: data.content,
	title: data.title,
	time: data.pubtime,
	mood: data.mood,
	weather: data.weather
})

export const getContent = (id) => {
	return (dispatch) => {
		axios.get("/api/detail.json?id="+id).then((res) => {
			var result = res.data.data;
			dispatch(initContent(result));
		}).catch((err) => {
			console.log(err)
		})
	}
}

export const changeContent = (html) => ({
	type: actionType.CHANGE_CONTENT,
	editorContent: html
})

export const changeTitle = (title) => ({
	type: actionType.CHANGE_TITLE,
	title
})