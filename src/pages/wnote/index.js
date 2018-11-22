import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import E from 'wangeditor';
//import EditableTable from './component/EditableTable';
import moment from 'moment';
import { Button, DatePicker } from 'antd';
import { LoginWrapper, LoginBox } from './style';
const { MonthPicker, RangePicker } = DatePicker;
function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}

function disabledRangeTime(_, type) {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
}

class Write extends Component{
	render(){
		return (
			<LoginWrapper>
				<LoginBox>
					<h4>
						<div>
							<a className="active" href="">写日记</a>
						</div>
					</h4>
					<Button style={{float:"right"}}>保存</Button>
					<div ref="editorMenu"></div>
					<div ref="editorElem" style={{height: "700px", minHeight: "400px", border: "1px solid #f0f0f0"}}></div>
					<div>
						<DatePicker
					      format="YYYY-MM-DD HH:mm:ss"
					      disabledDate={disabledDate}
					      disabledTime={disabledDateTime}
					      showTime={{ defaultValue: moment('00:00:00', 'HH:mm') }}
					    />
						<Button style={{float:"right"}}>保存</Button>
						<Button style={{float:"right"}}>保存</Button>
					</div>
				</LoginBox>
			</LoginWrapper>
		)
	}
	componentDidMount(){
	    const elem = this.refs.editorElem
	    const menu = this.refs.editorMenu
	    const editor = new E(menu, elem)
		editor.customConfig = {
		    onchange : html => {
		        this.props.handleChange(html)
		    },
		    colors : ['#000000','#eeece0','#1c487f','#4d80bf','#c24f4a','#8baa4a','#7b5ba1','#46acc8','#f9963b','#ffffff']
		}
	    editor.create()
	}
}

const mapDispatch = (dispatch) => ({
	handleChange: (html) => {
		dispatch(actionCreator.changeContent(html))
	}
})

export default connect(null, mapDispatch)(Write)