import axios from 'axios';
import * as actionType from './actionType';

const getDayNote = (data) => ({
	type: actionType.GET_DAYNOTE,
	finance: data
})

const initAllTotal = (data) => ({
	type: actionType.SET_ALLTOTAL,
	allTotal: data
})

export const getDayThings = (m) => {
	return (dispatch) => {
		axios.get("/api/finance.json?month="+m).then((res) => {
			var result = res.data.data;
			dispatch(getDayNote(result))
		}).catch((err) => {
			console.log(err)
		})
	}
}

export const getAllTotal = (m) => {
	return (dispatch) => {
		axios.get("/api/alltotal.json").then((res) => {
			var result = res.data.data;
			dispatch(initAllTotal(result))
		}).catch((err) => {
			console.log(err)
		})
	}
}

export const handleSetData = (d, k) => ({
	type: actionType.SET_DATA,
	finance: d,
	editing: k
})

export const handleSearchData = (s) => ({
	type: actionType.SET_SEARCHDATA,
	searchText: s
})

export const handleChartVisible = (v) => ({
	type: actionType.SET_CHARTVISIBLE,
	chartVisible: v
})