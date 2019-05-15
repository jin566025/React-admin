import React,{Component} from 'react'
import {Card} from 'antd'
import echartTheme from './echartTheme'

// import echarts from 'echarts'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
export default class Bar extends Component{
	componentWillMount(){
		echarts.registerTheme('React',echartTheme)
	}
	getOption = ()=>{
		let option = {
			title:{
				text:'标题'
			},
			tooltip:{
				trigger:'axis'
			},
			xAxis:{
				data: ['周一','周二','周三','周四','周五','周六','周日']
			},
			yAxis:{
				type: 'value'
			},
			series:[
				{
					name:'订单量',
					type:'bar',
					data:[1000,2000,1500,3000,2000,1200,1800]
				}
			]
		}
		return option
	}
	getOption2 = ()=>{
		let option = {
			title:{
				text:'标题'
			},
			legend:{
				data:['OFO','MOBIKE','HELLO']
			},
			tooltip:{
				trigger:'axis'
			},
			xAxis:{
				data: ['周一','周二','周三','周四','周五','周六','周日']
			},
			yAxis:{
				type: 'value'
			},
			series:[
				{
					name:'OFO',
					type:'bar',
					data:[4000,1200,5200,1000,2000,1200,1800]
				},
				{
					name:'MOBIKE',
					type:'bar',
					data:[1500,4500,1600,5500,1400,2200,6200]
				},
				{
					name:'HELLO',
					type:'bar',
					data:[2800,1800,1100,3000,1800,5000,1500]
				}
			]
		}
		return option
	}
	render(){
		return (
			<div>
				<Card title="柱形图表之一">
					<ReactEcharts option={this.getOption()} theme="React" style={{height:500}} />
				</Card>
				<Card title="柱形图表之二" style={{marginTop:10}}>
					<ReactEcharts option={this.getOption2()} theme="React" style={{height:500}} />
				</Card>
			</div>
		)
	}
}