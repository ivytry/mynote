import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import TotalTable from './component/TotalTable';
import EditableTable2 from './component/EditableTable2';
import EditableTable3 from './component/EditableTable3';
import { DatePicker } from 'antd';
import { LoginWrapper, LoginBox } from './style';
import moment from 'moment';

class Finance extends Component{
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
						<TotalTable />
						<EditableTable2 />
						<EditableTable3 />
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