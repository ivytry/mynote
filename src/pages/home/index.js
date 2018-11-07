import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Temperature from './component/Temperature';
import { HomeWrapper, BackTop, HomeFoot }from './style';

class Home extends PureComponent{
	render(){
		return (
			<HomeWrapper>
				<Temperature />
				<HomeFoot>
					<div className="main">
						<a target="_blank" rel="noopener noreferrer" href="http://www.jianshu.com/c/jppzD2">关于树懒</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.jianshu.com/contact">联系我们</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.jianshu.com/c/bfeec2e13990">加入我们</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.jianshu.com/p/fc1c113e5b6b">树懒出版</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.jianshu.com/press">品牌与徽标</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.jianshu.com/faqs">帮助中心</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.jianshu.com/p/cabc8fa39830">合作伙伴</a>      
						<div className="icp">
							<div>
						        ©2018-2088 重庆树懒责任有限公司 / 树懒 / 渝ICP备1314520号-8     
							</div>
							<div>
								<a target="_blank" rel="noopener noreferrer" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402002252">渝公网安备131452088888号 / </a> 
								&nbsp; 举报电话：021-34770013  
							</div>   
						</div>
					</div>
				</HomeFoot>
				{this.props.backTopShow ? <BackTop onClick={this.backTop}><i className="iconfont">&#xe657;</i></BackTop> : null}
			</HomeWrapper>
		)
	}

	backTop(){
		window.scrollTo(0, 0)
	}

	componentDidMount(){
		this.addEvents()
	}
	
	addEvents(){
		window.addEventListener("scroll", this.props.handleBackTop)
	}
}

const mapState = (state) => ({
	backTopShow: state.get("home").get("backTopShow")
})

const mapDispatch = (dispatch) => {
	return {
		handleBackTop: (e) => {
			dispatch(actionCreator.showBackTopBtn((document.body.scrollTop > 400) ? true : false))
		}
	}
}

export default connect(mapState, mapDispatch)(Home)