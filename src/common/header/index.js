import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreator as loginActionCreators } from '../../pages/login/store';
import axios from 'axios';
import { HeaderWrapper, HeaderInner, Logo, Nav, NavItem, NavSearch, Addition, Button } from './style';

class Header extends PureComponent {
	getWeather(){
		/*var instance = axios.create({
		  	baseURL: 'http://www.tianqi.com/',
		  	timeout: 1000,
		  	headers: {'X-Custom-Header': 'foobar'}
		});
		instance.get('/longRequest', {
		  	timeout: 5000
		});*/
		axios.get("http://www.weather.com.cn/html/weather/101010900.shtml?from=cn", {
			timeout: 5000,
			headers: {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"}
		}).then((res) => {
			console.log(res)
		})
	}
	
	render(){
		const { login, focused, list, handleFocus, handleBlur, handleLogout } = this.props
		return (
			<HeaderWrapper>
				<HeaderInner>
					<Link to="/">
						<Logo />
					</Link>
					<Nav>
						<NavItem className="left active"><a href="/">首页</a></NavItem>
						<NavItem className="left">事记</NavItem>
						<NavItem className="left">笔记</NavItem>
						<NavItem className="left">日记</NavItem>
						<NavItem className="left">财务</NavItem>
						<NavItem className="left">账务</NavItem>
						{login ? <NavItem className="right" onClick={handleLogout}>退出</NavItem> : <Link to="/login"><NavItem className="right">登录</NavItem></Link>}
						<NavItem className="right">
							<i className="iconfont">&#xe636;</i>
							{this.getWeather()}
						</NavItem>
						<Addition>
							<Button className="reg"><a href="/reg">注册</a></Button>
							<Button className="writing"><i className="iconfont">&#xe615;</i><a href="/write">写事记</a></Button>
						</Addition>
					</Nav>
				</HeaderInner>
			</HeaderWrapper>
		)
	}
}

const mapStateToProps = (state) => ({
	login: state.getIn(["login", "login"]),
	focused: state.getIn(["header", "focused"]),
	list: state.getIn(["header", "list"]),
	mouseIn: state.getIn(["header", "mouseIn"]),
	currentPage: state.getIn(["header", "currentPage"]),
	totalPage: state.getIn(["header", "totalPage"]),
	pageSize: state.getIn(["header", "pageSize"])
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleFocus: (list) => {
			(list.size === 0) && dispatch(actionCreators.getSearchInfoList())
			dispatch(actionCreators.focusSearch())
		},
		handleBlur: () => {
			dispatch(actionCreators.blurSearch())
		},
		handleMouseEnter: () => {
			dispatch(actionCreators.mouseEnter())
		},
		handleMouseLeave: () => {
			dispatch(actionCreators.mouseLeave())
		},
		handleSwitchPage: (currentPage, totalPage, icon) => {
			dispatch(actionCreators.switchPage(currentPage, totalPage, icon))
		},
		handleLogout: () => {
			dispatch(loginActionCreators.logout())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)