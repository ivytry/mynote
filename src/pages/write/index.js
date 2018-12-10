import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import EditableTable from './component/EditableTable';
import { Calendar, Badge } from 'antd';
import { LoginWrapper, LoginBox } from './style';
var moment = require('moment');

class Write extends Component{

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
		return (
			<LoginWrapper>
				<LoginBox>
					<h4>
						<div>
							<a className="active" href="">事记</a>
						</div>
					</h4>
					<div>
						<div className="calendar">
							<span className="ant-select-selection today" onClick={() => { handleSelect(moment()) }}>今天</span>
							<Calendar fullscreen={false} onSelect={handleSelect} dateCellRender={this.dateCellRender.bind(this)} />
						</div>
						<EditableTable />
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
	period: state.get("write").period,
	day: state.get("write").day
})

const mapDispatch = (dispatch) => ({
	handleSelect: (m) => {
		dispatch(actionCreator.getDayThings(m))
	},
	initDate: () => {
		dispatch(actionCreator.getInitDate())
	}
})

export default connect(mapState, mapDispatch)(Write)