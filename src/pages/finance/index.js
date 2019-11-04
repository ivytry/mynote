import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import TotalTable from './component/TotalTable';
import Revenue from './component/Revenue';
import Cost from './component/Cost';
import RevenueDetail from './component/RevenueDetail';
import CostDetail from './component/CostDetail';
import { DatePicker, Button } from 'antd';
import { LoginWrapper, LoginBox } from './style';
import moment from 'moment';
require('antd/dist/antd.css');

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
						<TotalTable />
						<DatePicker.MonthPicker 
							disabledDate={current => {
      							return current.isAfter(moment(Date.now()).add(6, 'days'));}
							} 
    						defaultValue={moment('2018/11', monthFormat)} 
    						format={monthFormat} 
    					/>
				        <Button icon="line-chart" style={{float:"right"}}></Button>
						<TotalTable />
						<Revenue />
						<Cost />
						<RevenueDetail />
						<CostDetail />
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