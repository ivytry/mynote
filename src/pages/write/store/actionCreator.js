import axios from 'axios';
import * as actionType from './actionType';

const getDayNote = (data, day) => ({
	type: actionType.GET_DAYNOTE,
	daynote: data,
	day
})

const initDate = (data) => ({
	type: actionType.INIT_DATE,
	period: data
})

export const getDayThings = (d) => {
	return (dispatch) => {
		axios.get("/api/daynote.json?date="+d).then((res) => {
			var result = res.data.data;
			dispatch(getDayNote(result, d))
		}).catch((err) => {
			console.log(err)
		})
	}
}

export const getInitDate = () => {
	return (dispatch) => {
		axios.get("/api/period.json").then((res) => {
			var result = res.data.data;
			dispatch(initDate(result))
		}).catch((err) => {
			console.log(err)
		})
	}
}

export const handleSetData = (d, k) => ({
	type: actionType.SET_DATA,
	daynote: d,
	editingKey: k
})