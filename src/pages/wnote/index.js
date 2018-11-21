import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import E from 'wangeditor';
//import EditableTable from './component/EditableTable';
//import { Calendar } from 'antd';
import { LoginWrapper, LoginBox } from './style';

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
					<Button></Button>
					<div ref="editorMenu"></div>
					<div ref="editorElem" style={{height: "700px", minHeight: "400px", border: "1px solid #f0f0f0"}}></div>
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