import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import EditableTable from './component/EditableTable';
import { List, Avatar, Button } from 'antd';
import { LoginWrapper, LoginBox } from './style';

class Diary extends Component{
	render(){
		return (
			<LoginWrapper>
				<LoginBox>
					<div className="top">
						<h4>日记</h4>
						<Button className="write"><i className="iconfont">&#xe615;</i>写日记</Button>
					</div>
					<div className="body">
						<List
						    itemLayout="horizontal"
						    dataSource={data}
						    pagination={{
						      onChange: (page) => {
						        console.log(page);
						      },
						      pageSize: 10,
						    }}
						    className="demo-loadmore-list"
						    renderItem={item => (
						      <List.Item extra={item.pubtime}>
						        <List.Item.Meta
						          avatar={<Avatar src={item.mood} />}
						          title={<a href={"/"+item.id}>{item.title}</a>}
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
	diary: state.get("diary")
})

const mapDispatch = (dispatch) => ({
	handleSelect: (m) => {
		dispatch(actionCreator.getDayThings(m))
	}
})

export default connect(mapState, mapDispatch)(Diary)