import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { LoginWrapper, LoginBox } from './style';
import { connect } from 'react-redux';
import EditableTable from './component/EditableTable';
import { actionCreator } from './store';
import { Input, Calendar } from 'antd';

function onSelect(value) {
  console.log(value)
}

function backToToday() {
	console.log("回到今天")
}

class Login extends PureComponent{
	render(){
		if(!this.props.login) {
			return (
				<LoginWrapper>
					<LoginBox>
						<div>
							<div className="calendar">
								<span className="ant-select-selection today" onClick={backToToday}>今天</span>
								<Calendar fullscreen={false} onSelect={onSelect} />
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
	login: state.get("login").get("login")
})

const mapDispatch = (dispatch) => ({
	handleLogin: (account, password) => {
		dispatch(actionCreator.logIn(account, password))
	}
})

export default connect(mapState, mapDispatch)(Login)