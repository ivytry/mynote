import axios from 'axios';
import * as actionType from './actionType';

export const getDayThings = (d) => {
	return (dispatch) => {
		axios.get("/api/daynote.json?date="+d).then((res) => {
			var result = res.data.data;
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