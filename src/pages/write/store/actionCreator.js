import axios from 'axios';
import * as actionType from './actionType';

const getDayNote = (data) => ({
	type: actionType.GET_DAYNOTE,
	daynote: data
})

export const getDayThings = (d) => {
	return (dispatch) => {
		axios.get("/api/daynote.json?date="+d).then((res) => {
			const result = res.data.data;
			dispatch(getDayNote(result))
		}).catch((err) => {
			console.log(err)
		})
	}
}
