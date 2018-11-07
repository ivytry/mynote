import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import EditableTable from './component/EditableTable';
import { Calendar } from 'antd';
import { LoginWrapper, LoginBox } from './style';

class Write extends Component{
	backToToday() {
		console.log("回到今天")
	}

	render(){
		return (
			<LoginWrapper>
				<LoginBox>
					<h4>
						<div>
							<a className="active" href="">日记</a>
						</div>
					</h4>
					<div>
						<div className="calendar">
							<span className="ant-select-selection today" onClick={this.backToToday}>今天</span>
							<Calendar fullscreen={false} onSelect={this.props.handleSelect} />
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

export default connect(null, mapDispatch)(Write)