import axios from 'axios';
import * as actionType from './actionType';

const getDtail = (data) => {
	return {
		type: actionType.GET_DETAIL_DATA,
		title: data.title,
		mood: data.mood,
		weather: data.weather,
		pubtime: data.pubtime,
		content: data.content,
		id: data.id
	}
}

export const getDtailData = (id) => {
	return (dispatch) => {
		axios.get("/api/detail.json?id="+id).then((res) => {
			dispatch(getDtail(res.data.data))
		}).catch((err) => {
			console.log(err)
		})
	}
}
