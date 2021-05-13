import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import { Menu, Dropdown, Button, Space, Badge, DatePicker, TimePicker } from 'antd';
import { LoginWrapper, LoginBox } from './style';
var moment = require('moment');

class Addt extends Component{

    getListData(value) {
	  let listData;
	  for(var i=0; i<this.props.period.length; i++){
    	if(this.props.period[i] === value.format("YYYY/MM/DD")){
    		listData = [
		        { type: 'error', content: 'fdsfa' }
		    ]; 
		    break;
    	}
	  }
	  return listData || [];
	}

    dateCellRender(value) {
	    const listData = this.getListData(value);
	    return (
	    	<ul className="events">
	      		{
	        		listData.map((item, index) => (
	            		<Badge status={item.type} key={index} title={item.content} />
	        		))
	      		}
	    	</ul>
	  	);
	}

	render(){
		const { day, handleSelect } = this.props
		const { RangePicker } = TimePicker;
		const dateFormat = 'YYYY-MM-DD';
		const menu1 = (
		  <Menu>
		    <Menu.Item>
		      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
		        水银体温计
		      </a>
		    </Menu.Item>
		    <Menu.Item>
		      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
		        电子体温计
		      </a>
		    </Menu.Item>
		    <Menu.Item>
		      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
		        红外线体温计
		      </a>
		    </Menu.Item>
		  </Menu>
		);
		const menu2 = (
		  <Menu>
		    <Menu.Item>
		      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
		        口腔
		      </a>
		    </Menu.Item>
		    <Menu.Item>
		      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
		        腋下
		      </a>
		    </Menu.Item>
		    <Menu.Item>
		      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
		        肛门
		      </a>
		    </Menu.Item>
		  </Menu>
		);

		function onChange(date, dateString) {
		  	console.log(date, dateString);
		}

		function disabledDate(current) {
		  	return current && current > moment().endOf('day');
		}

		return (
			<LoginWrapper>
				<LoginBox>
					<h4>
						<div>
							<a className="active" href="">我记</a>
						</div>
					</h4>
					<div>
				      	<Dropdown overlay={menu1} placement="bottomLeft">
				        	<Button>水银温度计</Button>
				      	</Dropdown>
				      	<Dropdown overlay={menu2} placement="bottomLeft">
				        	<Button>口腔</Button>
				      	</Dropdown>
    					<DatePicker onChange={onChange} defaultValue={moment()} disabledDate={disabledDate} />
    					<RangePicker />
					</div>
				</LoginBox>
			</LoginWrapper>
		)
	}

	componentDidMount(){
		this.props.initDate()
	}
}

const mapState = (state) => ({
	//period: state.get("Add").period,
	//day: state.get("Add").day
})

const mapDispatch = (dispatch) => ({
	handleSelect: (m) => {
		dispatch(actionCreator.getDayThings(m))
	},
	initDate: () => {
		dispatch(actionCreator.getInitDate())
	}
})

export default connect(mapState, mapDispatch)(Addt)