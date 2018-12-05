import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { LoginWrapper, LoginBox } from './style';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import { Icon } from 'antd';

class Reg extends PureComponent{
	render(){
		if(!this.props.login) {
			return (
				<LoginWrapper>
					<LoginBox>
						<h4>
							<div>
								<a href="/login">登录</a>
								<b> · </b>
								<a className="active" href="/logup">注册</a>
							</div>
						</h4>
						<div>
							<form action="/sessions">
								<div className="restyle">
									<input className="ic-user" type="text" placeholder="用户名" ref={(input) => {this.account = input}} />
									<Icon type="user" />
								</div>
								<div className="restyle">
									<input className="ic-phone" type="tel" placeholder="手机号" ref={(input) => {this.password = input}} />
									<Icon type="phone" />
								</div>
								<div className="restyle">
									<input className="ic-phone" type="password" placeholder="密码" ref={(input) => {this.password = input}} />
									<Icon type="lock" />
								</div>
								<div className="restyle">
									<input className="ic-password" type="password" placeholder="确认密码" ref={(input) => {this.password = input}} />
									<Icon type="lock" />
								</div>
								<button onClick={() => {this.props.handleLogin(this.account.value, this.password.value)}}>注册</button>
							</form>
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

export default connect(mapState, mapDispatch)(Reg)