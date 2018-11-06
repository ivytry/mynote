import React, {Component} from 'react';
import * as echarts from 'echarts';

var data = [36.46 , 36.44 , 36.54 , 36.70, 36.55, 36.55, 36.60, 36.60];
var date = ['30','31','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','1','2'];

var max = Math.max.apply(null, data);
var min = Math.min.apply(null, data);

const buldChart = (el) => {
	var myChart = echarts.init(el);

	let option = {
	    title: {
	        text: '基础体温变化趋势图'
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
	        data: date
	    },
	    yAxis: {
	        type: 'value',
	        min: Math.floor(min),
	        max: Math.ceil(max)
	    },
	    series: [
	        {
	            type:'line',
	            data:data,
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

class Temperature extends Component {
	render(){
		const style = {width:'900px', height:'500px', padding:'15px'}
		return (
			<div style={style} ref='mydiv' ></div>
		)
	}
	componentDidMount(){
		buldChart(this.refs.mydiv)
	}
}

export default Temperature