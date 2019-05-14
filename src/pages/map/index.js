import React,{Component} from 'react'
import {Card,Form} from 'antd'
import  axios from '../../axios'
import BaseForm from '../../components/BaseForm'
export default class BikeMap extends Component{
	state = {}
	params = {
		page:1
	}
	formList = [
		{
			type:"城市",
			list:[{id:'0',name:'全部'},{id:'1',name:'北京市'},{id:'2',name:'上海市'},{id:'3',name:'杭州市'}]
		},
		{
			type:'时间查询'
		},
		{
			type:'SELECT',
			label:'订单状态',
			field:'order_status',
			placeholder:'全部',
			initialValue:'0',
			list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'已结束'}]
		}
	]
	componentDidMount(){
		this.requestList()
	}
	handleFilterSubmit = (params)=>{
		this.requestList()
	}
	requestList = ()=>{
		axios.ajax({
			url:'bike_list',
			data:{
				params:this.params
			}
		}).then(res=>{
			this.setState({
				total_count:res.data.result.total_count
			})
			this.renderMap(res)
		})
	}
	renderMap = (res)=>{
		let list = res.data.result.route_list;
		this.map = new window.BMap.Map('container');
		let gps1 = list[0].split(',');
		let startPoint = new window.BMap.Point(gps1[0],gps1[1]);
		let gps2 = list[list.length-1].split(',');
		let endPoint = new window.BMap.Point(gps2[0],gps2[1]);
		this.map.centerAndZoom(endPoint,11);
		
		let startPointIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
			imageSize:new window.BMap.Size(36,42),
			anchor:new window.BMap.Size(18,42)
		})
		let bikeMarkerStart = new window.BMap.Marker(startPoint,{icon:startPointIcon})
		this.map.addOverlay(bikeMarkerStart)
		
		let endPointIcon = new window.BMap.Icon('/assets/end_point.png',new window.BMap.Size(36,42),{
			imageSize:new window.BMap.Size(36,42),
			anchor:new window.BMap.Size(18,42)
		})
		let bikeMarkerEnd = new window.BMap.Marker(endPoint,{icon:endPointIcon})
		this.map.addOverlay(bikeMarkerEnd)
		
		let routeList = [];
		list.map((item,index)=>{
			let p = item.split(",");
			routeList.push(new window.BMap.Point(p[0],p[1]))
		})
		let polyLine = new window.BMap.Polyline(routeList,{
			strokeColor:'#ef4136',
			strokeWeight:2,
			strokeOpacity:1
		})
		this.map.addOverlay(polyLine)
		
		let servicePointList = [];
		let serviceList = res.data.result.service_list;
		serviceList.map((item,index)=>{
			servicePointList.push(new window.BMap.Point(item.lon,item.lat))
		})
		let polyServiceLine = new window.BMap.Polyline(servicePointList,{
			strokeColor:'#ef4136',
			strokeWeight:2,
			strokeOpacity:1
		})
		this.map.addOverlay(polyServiceLine)
		
		
		let bikeList = res.data.result.bike_list;
		let bikeIcon = new window.BMap.Icon('/assets/bike.jpg',new window.BMap.Size(36,42),{
			imageSize:new window.BMap.Size(36,42),
			anchor:new window.BMap.Size(18,42)
		})
		bikeList.map((item,index)=>{
			let p = item.split(",");
			let point = new window.BMap.Point(p[0],p[1]);
			let bikeMarker = new window.BMap.Marker(point,{icon:bikeIcon})
			this.map.addOverlay(bikeMarker)
		})
	}
	render(){
		return (
			<div>
				<Card>
					<BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
				</Card>
				<Card style={{marginTop:10}}>
					<div>共{this.state.total_count}辆车</div>
					<div id="container" style={{height:400}}></div>
				</Card>
			</div>
		)
	}
}