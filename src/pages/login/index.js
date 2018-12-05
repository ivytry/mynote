import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { LoginWrapper, LoginBox } from './style';
import { connect } from 'react-redux';
import { actionCreator } from './store';

class Login extends PureComponent{
	render(){
		if(!this.props.login) {
			return (
				<LoginWrapper>
					<LoginBox>
						<h4>
							<div>
								<a className="active" href="/login">登录</a>
								<b> · </b>
								<a href="/reg">注册</a>
							</div>
						</h4>
						<div>
							<form action="/sessions">
								<div className="restyle">
									<input className="ic-user" type="text" placeholder="用户名或手机号" ref={(input) => {this.account = input}} />
									<i class="iconfont">&#xe624;</i>
								</div>
								<div className="restyle">
									<input className="ic-password" type="password" placeholder="密码" ref={(input) => {this.password = input}} />
									<i class="iconfont">&#xe61b;</i>
								</div>
								<div className="remember-btn">
									<input type="checkbox" value="true" checked />
									<span>记住密码</span>
								</div>
								<div className="forget-btn">
									<a href data-toggle="dropdown">忘记密码</a>
								</div>
								<button onClick={() => {this.props.handleLogin(this.account.value, this.password.value)}}>登陆</button>
							</form>
							<div className="more-sign">
								<h6>社交帐号登录</h6>
								<ul>
								    <li><a className="weibo" href=""><i className="iconfont ic-weibo">&#xe62f;</i></a></li>
								    <li><a className="weixin" target="_blank" href="/users/auth/wechat"><i className="iconfont ic-wechat">&#xe63e;</i></a></li>
								    <li><a id="qq" className="qq" target="_blank" href="/users/auth/qq_connect"><i className="iconfont ic-qq_connect">&#xe6d8;</i></a></li>
								    <li className="js-hide-method"><a className="douban" target="_blank" href="/users/auth/douban"><i className="iconfont ic-douban">&#xe64d;</i></a></li>
								</ul>
							</div>
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