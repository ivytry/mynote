import axios from 'axios';
import * as actionType from './actionType';
import { fromJS } from 'immutable';

const getHomeData = (temperture) => ({
	type: actionType.GET_INIT_HOMR_DATA,
	temperture
})

const setInitData = (data) => ({
	type: actionType.SET_INIT_DATA,
	data: fromJS(data)
})

export const changeSlideTo = (slideTo) => ({
	type: actionType.CHANGE_SLIDETO,
	slideTo
})

export const showBackTopBtn = (backTopShow) => ({
	type: actionType.IS_SHOW_BACKTOPBTN,
	backTopShow
})

export const getInitHomeData = () => {
	return (dispatch) => {
		axios.get("/api/homedata.json").then((res) => {
			dispatch(getHomeData(res.data.data))
		}).catch((err) => {
			console.log(err)
		})
	}
}

export const getInitData = () => {
	return (dispatch) => {
		axios.get("/api/data.json").then((res) => {
			dispatch(setInitData(res.data.data))
		}).catch((err) => {
			console.log(err)
		})
	}
}
