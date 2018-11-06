import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import EditableTable from './component/EditableTable';
import { Calendar } from 'antd';
import { LoginWrapper, LoginBox } from './style';

function backToToday() {
	console.log("回到今天")
}

class Write extends PureComponent{
	render(){
		if(!this.props.login) {
			return (
				<LoginWrapper>
					<LoginBox>
						<h4>
							<div>
								<a className="active" href="/login">日记</a>
							</div>
						</h4>
						<div>
							<div className="calendar">
								<span className="ant-select-selection today" onClick={backToToday}>今天</span>
								<Calendar fullscreen={false} onSelect={this.props.handleSelect} />
							</div>
							<EditableTable />
						</div>
					</LoginBox>
				</LoginWrapper>
			)
		}else{
			return <Redirect to="/" />
		}
	}
}

const mapState = (state) => ({
	write: state.get("write").get("write")
})

const mapDispatch = (dispatch) => ({
	handleSelect: (m) => {
		dispatch(actionCreator.getDayThings(m))
	}
})

export default connect(mapState, mapDispatch)(Write)