import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import EditableTable from './component/EditableTable';
import { DatePicker } from 'antd';
import { LoginWrapper, LoginBox } from './style';
import moment from 'moment';

class Finance extends Component{
	backToToday() {
		console.log("回到今天")
	}

	render(){
		const monthFormat = 'YYYY/MM';
		return (
			<LoginWrapper>
				<LoginBox>
					<h4>
						<div>
							<a className="active" href="">财务</a>
						</div>
					</h4>
					<div>
						<DatePicker.MonthPicker defaultValue={moment('2018/11', monthFormat)} format={monthFormat} />
						<div className="calendar">
							<span className="ant-select-selection today" onClick={this.backToToday}>今天</span>
						</div>
						<EditableTable />
					</div>
				</LoginBox>
			</LoginWrapper>
		)
	}
}

const mapDispatch = (dispatch) => ({
	handleSelect: (m) => {
		dispatch(actionCreator.getDayThings(m))
	}
})

export default connect(null, mapDispatch)(Finance)