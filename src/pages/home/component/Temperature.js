import React, {Component} from 'react';
import * as echarts from 'echarts';
import { connect } from 'react-redux';
import { actionCreator } from '../store';

class Temperature extends Component {
	buldChart(el){
		const { temperture } = this.props;

		var myChart = echarts.init(el);
		var temper = temperture;
		var t = temper.temperture2;
		var temperList = t?t.map(function (item) { return item[1] }):[0.1];

		var max = Math.max.apply(null, temperList);
		var min = Math.min.apply(null, temperList);
		var maxInt = Math.floor(max);
		var minInt = Math.floor(min);

		max = (max-maxInt>0.5) ? maxInt+1:(maxInt+0.5);
		min = (min-minInt>0.5) ? (minInt-0.5):minInt;

		let option = {
		    title: {
		        text: '近一月基础体温变化图',
		        subtext: temperture.peired,
		        textStyle:{
		        	color: '#969696',
		        	fontWeight: 'normal',
		        	fontSize: 14
		        }
		    },
		    legend: {
		        data: ['同房', '白带拉丝'],
                bottom: 20
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
		        }
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel: {
		            formatter: '{value} ℃'
		        },
		        axisLine:{
		        	lineStyle:{
		        		color:'#aaa'
		        	}
		        },
		        min: min,
		        max: max
		    },
		    series: [
		        {
		        	name:'温度计1',
		            type:'line',
		            color:"gray",
		            data: temperture.temperture1,    
            		markArea: {
                		data: [ [{
                    		name: '经期',
                    		xAxis: '2021/4/3'
                		}, {
                    		xAxis: '2021/4/6'
                		}] ]
            		}
		        },
		        {
		        	name:'温度计2',
		            type:'line',
		            data: temperture.temperture2,    
		            markPoint: {
		                data: [
		                    {
		                    	name: '白带拉丝',
		                    	symbol:'diamond',
		                    	symbolSize:20,
		                    	symbolOffset:[0,'-70%'],
        						coord: ["2021/4/19", 36.65],
		           				itemStyle: {
		           					color:'#1fad25'
		           				}
		                    },
		                    {
		                    	name: '白带拉丝',
		                    	symbol:'diamond',
		                    	symbolSize:20,
		                    	symbolOffset:[0,'-70%'],
        						coord: ["2021/4/20", 36.75],
		           				itemStyle: {
		           					color:'#1fad25'
		           				}
		                    },
		                    {
		                    	name: '爱爱',
		                    	symbol:'path//M512 919.194002l-64.352657-58.361199C219.085764 653.353378 68.191078 516.438079 68.191078 348.900342c0-136.915299 107.180068-244.094344 244.094344-244.094344 77.222779 0 151.3388 35.948747 199.713554 92.53451 48.374754-56.585763 122.490775-92.53451 199.713554-92.53451 136.915299 0 244.094344 107.180068 244.094344 244.094344 0 167.537737-150.894685 304.453037-379.456265 511.933485L512 919.194002z',
		                    	symbolSize:30,
        						coord: ["2021/4/25", 37]
		                    }
		                ]
		            },
            		markLine: {
                		data: [
                    		{type: 'average', name: '平均值'}
                		]
            		},
            		markArea: {
                		data: [ [{
                    		name: '经期',
                    		xAxis: '2021/5/6'
                		}, {
                    		xAxis: '2021/5/11'
                		}] ]
            		}
		        },
        	]
		};

		myChart.setOption(option);
	}

	render(){
		const style = {width:'900px', height:'500px', padding:'15px'}
		return (
			<div style={style} ref='mydiv'></div>
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

const mapDispatch = (dispatch) => ({
	handleGetInitData: () => {
		dispatch(actionCreator.getInitHomeData())
	}
})

export default connect(mapState, mapDispatch)(Temperature)
