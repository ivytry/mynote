import axios from 'axios';
import * as actionType from './actionType';

const getHomeData = (data) => {
	return {
		type: actionType.GET_INIT_HOMR_DATA,
		temperture: data
	}
}

export const changeSlideTo = (slideTo) => {
	return{
		type: actionType.CHANGE_SLIDETO,
		slideTo: slideTo
	}
}

export const getInitHomeData = () => {
	return (dispatch) => {
		axios.get("/api/homedata.json").then((res) => {
			dispatch(getHomeData(res.data.data))
		}).catch((err) => {
			console.log(err)
		})
	}
}

export const showBackTopBtn = (flag) => ({
	type: actionType.IS_SHOW_BACKTOPBTN,
	backTopShow: flag
})
