import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import TotalTable from './component/TotalTable';
import MonthTable from './component/MonthTable';
import Revenue from './component/Revenue';
import Cost from './component/Cost';
import RevenueDetail from './component/RevenueDetail';
import CostDetail from './component/CostDetail';
import { DatePicker, Button, Modal } from 'antd';
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
				        <Button icon="line-chart" style={{float:"right"}} onClick={() => this.props.setChartVisible(true)}></Button>
				        <Modal
				          title="m"
				          centered
				          visible={this.props.chartVisible}
				          onOk={() => this.props.setChartVisible(false)}
				          onCancel={() => this.props.setChartVisible(false)}
				        >
				          <p>some contents...</p>
				        </Modal>
						<MonthTable />
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

const mapState = (state) => ({
    chartVisible: state.get("finance").chartVisible
})

const mapDispatch = (dispatch) => ({
	handleSelect: (m) => {
		dispatch(actionCreator.getDayThings(m))
	},
    setChartVisible: (v) => {
		dispatch(actionCreator.handleChartVisible(v))
    }
})

export default connect(null, mapDispatch)(Finance)
