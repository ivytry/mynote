import axios from 'axios';
import * as actionType from './actionType';

const getDayNote = (data) => ({
	type: actionType.GET_DAYNOTE,
	daynote: data
})

export const getDayThings = () => {
	return (dispatch) => {
		axios.get("/api/account.json").then((res) => {
			var result = res.data.data;
			dispatch(getDayNote(result))
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