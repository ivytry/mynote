import axios from 'axios';
import * as actionType from './actionType';

const getDayNote = (data) => ({
	type: actionType.GET_DAYNOTE,
	finance: data
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

export const handleSetData = (d, k) => ({
	type: actionType.SET_DATA,
	finance: d,
	editingKey: k
})