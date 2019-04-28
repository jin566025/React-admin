import React,{Component} from 'react'
import { Row,Col } from 'antd'
import './index.less'
import Util from '../../util/utils'
import axios from '../../axios'
export default class Header extends Component{
	state={}
	componentWillMount(){
		this.setState({
			username:"金大圣呐"
		})
		setInterval(()=>{
			let sysTime = Util.formateDate(new Date().getTime());
			this.setState({
				sysTime
			})
		},1000)
		this.getWeatherAPIData()
	}
	getWeatherAPIData(){
		let city = "宁波";
		city = encodeURIComponent(city);
		let url = `https://www.tianqiapi.com/api/?version=v1&city=${city}&ip=27.193.13.255&callback=%20`
		axios.jsonp({
			url:url
		}).then(res=>{
			if(res.data){
				let weather = res.data[0].wea;
				this.setState({
					weather:weather
				})
			}
		})
	}
	render(){
		return(
			<div className="header">
				<Row className="header-top">
					<Col span="24">
						<span>欢迎━(*｀∀´*)ノ亻!,{this.state.username}</span>
						<a href="#">退出</a>
					</Col>
				</Row>
				<Row className="breadcrumb">
					<Col span="4"  className="breadcrumb-title">
						首页
					</Col>
					<Col span="20"  className="weather">
						<span className="date">{this.state.sysTime}</span>
						<span className="weather-detail">{this.state.weather}</span>
					</Col>
				</Row>
			</div>
		)
	}
}