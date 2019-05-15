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
export default class Pie extends Component{
	componentWillMount(){
		echarts.registerTheme('React',echartTheme)
	}
	getOption = ()=>{
		let option = {
			title:{
				text:'标题'
			},
			legend:{
				orient:'vertical',
				right:10,
				top:20,
				bottom:20,
				data:['周一','周二','周三','周四','周五','周六','周日']
			},
			tooltip:{
				trigger:'item',
				formatter:'{a}<br/>{b}:{c}'
			},
			series:[
				{
					name:'订单量',
					type:'pie',
					data:[
						{value:1000,name:'周一'},
						{value:3000,name:'周二'},
						{value:2000,name:'周三'},
						{value:1200,name:'周四'},
						{value:1500,name:'周五'},
						{value:3000,name:'周六'},
						{value:1800,name:'周日'}
					]
				}
			]
		}
		return option
	}

	render(){
		return (
			<div>
				<Card title="饼图之一">
					<ReactEcharts option={this.getOption()} theme="React" style={{height:500}} />
				</Card>

			</div>
		)
	}
}