import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import EditableTable from './component/EditableTable';
import { List, Avatar, Button } from 'antd';
import { LoginWrapper, LoginBox } from './style';

class Notes extends Component{
	goto(){
		const w=window.open('about:blank');
		w.location.href='/wnote'
	}
	render(){
		return (
			<LoginWrapper>
				<LoginBox>
					<div className="top">
						<h4>笔记</h4>
						<Button className="write" onClick={this.goto}><i className="iconfont">&#xe615;</i>写笔记</Button>
					</div>
					<div className="body">
						<List
						    itemLayout="horizontal"
						    dataSource={this.props.diarys}
						    pagination={{
						      onChange: (page) => {
						        console.log(page);
						      },
						      pageSize: 10,
						    }}
						    className="demo-loadmore-list"
						    renderItem={item => (
						      <List.Item extra={<span>{item.pubtime}</span>}>
						        <List.Item.Meta
						          title={<a href={"/detail/"+item.id}>{item.title}</a>}
						          description={item.content}
						        />
						      </List.Item>
						    )}
						/>
					</div>
				</LoginBox>
			</LoginWrapper>
		)
	}
}

const mapState = (state) => ({
	diarys: state.get("notes").diarys
})

const mapDispatch = (dispatch) => ({
	handleSelect: (m) => {
		dispatch(actionCreator.getDayThings(m))
	}
})

export default connect(mapState, mapDispatch)(Notes)