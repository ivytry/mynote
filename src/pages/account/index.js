import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import EditableTable from './component/EditableTable';
import { Calendar } from 'antd';
import { LoginWrapper, LoginBox } from './style';

class Account extends Component{
	render(){
		return (
			<LoginWrapper>
				<LoginBox>
					<h4>
						<div>
							<a className="active" href="">账务</a>
						</div>
					</h4>
					<div>
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

export default connect(null, mapDispatch)(Account)