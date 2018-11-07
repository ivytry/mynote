import React, {Component} from 'react';
import * as echarts from 'echarts';
import { connect } from 'react-redux';
import { actionCreator } from '../store';

class Temperature extends Component {
	buldChart(el){
		const { temperture } = this.props;

		var myChart = echarts.init(el);

		var max = Math.max.apply(null, temperture.temperture);
		var min = Math.min.apply(null, temperture.temperture);

		let option = {
		    title: {
		        text: '近一月基础体温变化趋势图',
		        subtext: temperture.peired,
		        textStyle:{
		        	color: '#969696',
		        	fontWeight: 'normal',
		        	fontSize: 14
		        }
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    toolbox: {
		        feature: {
		            saveAsImage: {
		                type:'png',
		                show: true
		            }
		        }
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        axisLine:{
		        	lineStyle:{
		        		color:'#aaa'
		        	}
		        },
		        data: temperture.day
		    },
		    yAxis: {
		        type: 'value',
		        axisLine:{
		        	lineStyle:{
		        		color:'#aaa'
		        	}
		        },
		        min: Math.floor(min),
		        max: Math.ceil(max)
		    },
		    series: [
		        {
		            type:'line',
		            data: temperture.temperture,
		            markPoint: {
		                data: [
		                    {
		                    	type: 'max', 
		                    	name: '最大值'
		                    },
		                    {
		                    	type: 'min', 
		                    	name: '最小值',
		           				itemStyle: {
		           					color:'#1fad25'
		           				}
		                    }
		                ]
		            }
		        }
		    ]
		};

		myChart.setOption(option);
	}

	render(){
		const style = {width:'900px', height:'500px', padding:'15px'}
		return (
			<div style={style} ref='mydiv' ></div>
		)
	}

	componentWillMount(){
		this.props.handleGetInitData()
	}

	componentDidMount(){
		this.buldChart(this.refs.mydiv)
	}

	componentDidUpdate(){
		this.buldChart(this.refs.mydiv)
	}
}

const mapState = (state) => ({
	temperture: state.get("home").get("temperture")
})

const mapDispatch = (dispatch) => {
	return {
		handleGetInitData: () => {
			dispatch(actionCreator.getInitHomeData())
		},
		handleBackTop: (e) => {
			dispatch(actionCreator.showBackTopBtn((document.body.scrollTop > 400) ? true : false))
		}
	}
}

export default connect(mapState, mapDispatch)(Temperature)
