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
export default class Line extends Component{
	componentWillMount(){
		echarts.registerTheme('React',echartTheme)
	}
	getOption = ()=>{
		let option = {
			title:{
				text:'标题',
				x:'center'
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
					type:'line',
					data:[1000,2000,1500,3000,2000,1200,1800]
				}
			]
		}
		return option
	}

	render(){
		return (
			<div>
				<Card title="折线形图表之一">
					<ReactEcharts option={this.getOption()} theme="React" style={{height:500}} />
				</Card>

			</div>
		)
	}
}