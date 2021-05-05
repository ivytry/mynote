import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Temperature from './component/Temperature';
import { HomeWrapper, BackTop, HomeFoot }from './style';
import { Table } from 'antd';
import { toJS } from 'immutable';

class Home extends PureComponent{
	render(){
		const columns = [
		  { title: '开始时间', dataIndex: 'stime', key: 'stime' },
		  { title: '结束时间', dataIndex: 'etime', key: 'etime' },
		  { title: '历时', dataIndex: 'days', key: 'days' }
		];
		return (
			<HomeWrapper>
				<Temperature />
				<Table
					style={{width: "880px", paddingLeft: "20px"}}
				    columns={columns}
				    expandedRowRender={ record => <ul style={{margin: 0}}>{ record.detail.map( (item, index) => <li key={index}><span style={{marginRight: '15px'}}>{item.day}</span><span>{item.description}</span></li>)}</ul> }
				    dataSource={this.props.data.toJS()}
				    pagination={this.props.data.toJS().length > 5 ? true : false}
				/>
				<HomeFoot>
					<div className="main">
						<a target="_blank" rel="noopener noreferrer" href="http://www.shulan.com/c/jppzD2">关于树懒</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.shulan.com/contact">联系我们</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.shulan.com/c/bfeec2e13990">加入我们</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.shulan.com/p/fc1c113e5b6b">树懒出版</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.shulan.com/press">品牌与徽标</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.shulan.com/faqs">帮助中心</a><em> · </em>
						<a target="_blank" rel="noopener noreferrer" href="http://www.shulan.com/p/cabc8fa39830">合作伙伴</a>      
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
		this.props.initData()
		this.addEvents()
	}
	
	addEvents(){
		window.addEventListener("scroll", this.props.handleBackTop)
	}
}

const mapState = (state) => ({
	backTopShow: state.get("home").get("backTopShow"),
	data: state.get("home").get("data")
})

const mapDispatch = (dispatch) => ({
	initData: () => {
		dispatch(actionCreator.getInitData())
	},
	handleBackTop: (e) => {
		dispatch(actionCreator.showBackTopBtn((document.body.scrollTop > 400) ? true : false))
	}
})

export default connect(mapState, mapDispatch)(Home)