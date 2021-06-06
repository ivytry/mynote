import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreator as loginActionCreators } from '../../pages/login/store';
import axios from 'axios';
import { Icon } from 'antd';
import { HeaderWrapper, HeaderInner, Logo, Nav, NavItem, NavSearch, Addition, Button } from './style';

class Header extends PureComponent {
	
	render(){
		const { login, focused, list, handleFocus, handleBlur, handleLogout, nav, activeNav, handleChangeNav } = this.props
		return (
			<HeaderWrapper>
				<HeaderInner>
					<Link to="/">
						<Logo />
					</Link>
					<Nav>
						{
							nav.map((item, index) => {
								let cln = "left";
								if(activeNav === index){
									cln = "left active";
								}
								return <NavItem key={index} className={cln}><a href={"/"+item.get("url")} onClick={(index) => { handleChangeNav(index) }}>{item.get("name")}</a></NavItem>
							})
						}
						{login ? <NavItem className="right" onClick={handleLogout}>退出</NavItem> : <Link to="/login"><NavItem className="right">登录</NavItem></Link>}
						<NavItem className="right">
							<Icon type="bell" />
						</NavItem>
						<Addition>
							<Button className="reg"><a href="/reg">注册</a></Button>
							<Button className="writing"><i className="iconfont">&#xe615;</i><a href="/add">写事记</a></Button>
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
	pageSize: state.getIn(["header", "pageSize"]),
	nav: state.getIn(["header", "nav"]),
	activeNav: state.getIn(["header", "activeNav"]),
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
		},
		handleChangeNav: (index) => {
			dispatch(actionCreators.changeNav(index))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)