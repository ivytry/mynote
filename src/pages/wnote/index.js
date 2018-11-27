import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import E from 'wangeditor';
//import EditableTable from './component/EditableTable';
import moment from 'moment';
import { Button, DatePicker, Select, Icon, Form, Input } from 'antd';
import { LoginWrapper, LoginBox } from './style';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };

function disabledDate(current) {
  return current > moment().endOf('day');
}

document.onkeydown=function (event) { 
     event=event||window.event;
     var key=event.keyCode;
     if(key === 83 && event.ctrlKey){
     	return false
     }
}

class Write extends Component{
	handleChange(value) {
	  console.log(`selected ${value}`);
	}
	handleKeyDown(){
		var i=0;
		document.addEventListener('keyup',function(e){
			e = window.event || e;
	        if(e.keyCode === 83 && e.ctrlKey){
				e.preventDefault();
	        	console.log("save " + i++)
				e.stopPropagation();
				return false
	        }
	    })
	}
	render(){
		const {
			title, editorContent, time, weather, mood, type, 
			handleChangeTitle, handleChange, handleChangeTime, handleChangeWeather, handleChangeMood, handleChangeType
		} = this.props

		const format = "YYYY-MM-DD HH:mm:ss"

		function onOk(value) {
		  console.log('onOk: ', value);
		}

		function onChange(value, dateString) {
		  console.log('Selected Time: ', value);
		  console.log('Formatted Selected Time: ', dateString);
		}

		return (
			<LoginWrapper>
				<LoginBox>
					<h4>
						<div>
							<a className="active" href="">写笔记</a>
						</div>
					</h4>
					<div style={{overflow: "hidden"}}>
						<FormItem
				          {...formItemLayout}
				          label="标题"
				          style={{float:"left",width:440,marginBottom:"2px"}}
				        >
				            <Input value={title} onChange={handleChangeTitle} />
				        </FormItem>
			        </div>
					<a className="btn save" title="保存"><Icon type="save" /></a>
					<div ref="editorMenu"></div>
					<div ref="editorElem" style={{height: "700px", minHeight: "400px", border: "1px solid #f0f0f0"}} onKeyDown={this.handleKeyDown}></div>
					<div>
					    <DatePicker
					      onChange={onChange}
					    />
					    <Select defaultValue="晴" style={{ width: 120 }} onChange={handleChangeWeather}>
					      <Option value="jack">晴</Option>
					      <Option value="lucy">阴</Option>
					      <Option value="disabled">大雨</Option>
					      <Option value="Yiminghe">小雨</Option>
					      <Option value="Yiminghe">毛毛雨</Option>
					    </Select>
					    <Select defaultValue="一般" style={{ width: 120 }} onChange={handleChangeMood}>
					      <Option value="jack">一般</Option>
					      <Option value="lucy">好</Option>
					      <Option value="disabled">不好</Option>
					      <Option value="Yiminghe">开心</Option>
					    </Select>
					    <Select defaultValue="日记" style={{ width: 120, float:"right" }} onChange={handleChangeType}>
					      <Option value="diary">日记</Option>
					      <Option value="note">笔记</Option>
					    </Select>
					</div>
				</LoginBox>
			</LoginWrapper>
		)
	}
	renderEditor(){
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
	    editor.txt.html(this.props.editorContent)
	}
	componentDidMount(){
		this.renderEditor()
	}
}

const mapState = (state) => ({
	title: state.get("wnote").title,
	editorContent: state.get("wnote").editorContent,
	time: state.get("wnote").time,
	type: state.get("wnote").type,
	mood: state.get("wnote").mood,
	weather: state.get("wnote").weather
})

const mapDispatch = (dispatch) => ({
	handleChange: (html) => {
		dispatch(actionCreator.changeContent(html))
	},
	handleChangeTitle: (e) => {
		const title = e.target.value
		dispatch(actionCreator.changeTitle(title))
	},
	handleChangeTime: (date, datestring) => {
		console.log(date)
		console.log(datestring)
		dispatch(actionCreator.changeTitle(datestring))
	},
	handleChangeMood: (e) => {
		const title = e.target.value
		console.log(title)
		dispatch(actionCreator.changeTitle(title))
	},
	handleChangeWeather: (e) => {
		const title = e.target.value
		console.log(title)
		dispatch(actionCreator.changeTitle(title))
	},
	handleChangeType: (e) => {
		const title = e.target.value
		console.log(title)
		dispatch(actionCreator.changeTitle(title))
	}
})

export default connect(mapState, mapDispatch)(Write)