import React,{ Component } from 'react'
import {Card,Table,Button,Modal,message} from 'antd'
import axios from './../../axios'
import utils from './../../util/utils'
export default class BasicTable extends Component{
	state = {}
	params = {
		page:1
	}
	componentDidMount(){
		const dataSource = [
			{id:'0',username:'jack',sex:'1',state:'1',interest:'1',birthday:'2000-01-01',address:'宁波市',time:'09:00'},
			{id:'1',username:'jack',sex:'1',state:'1',interest:'1',birthday:'2000-01-01',address:'宁波市',time:'09:00'},
			{id:'2',username:'jack',sex:'1',state:'1',interest:'1',birthday:'2000-01-01',address:'宁波市',time:'09:00'},
			{id:'3',username:'jack',sex:'1',state:'1',interest:'1',birthday:'2000-01-01',address:'宁波市',time:'09:00'},
			{id:'4',username:'jack',sex:'1',state:'1',interest:'1',birthday:'2000-01-01',address:'宁波市',time:'09:00'},
		]
		dataSource.map((item,index)=>{
			item.key = index
		})
		this.setState({dataSource})
		this.request()
	}
	
	request = ()=> {
		let that = this;
		axios.ajax({
			url:'/table/list',
			data:{
				params:this.params,
				isShowLoadig:true
			}
		}).then(res=>{
			let dataSource2 = res.data.result;
			dataSource2.map((item,index)=>{
				item.key = index
			})
			this.setState({
				dataSource2,
				selectedRowKeys:[],
				selectedRows:null,
				pagination:utils.pagination(res.data,(current)=>{
					that.params.page = current;
					that.request()
				})
			})
		})
	}
	onRowClick = (recode,index)=>{
		let selectKey = [index];
		this.setState({
			selectedRowKeys:selectKey,
			selectedItem:recode
		})
	}
	handleDelete = ()=>{
		let rows = this.state.selectedRows;
		let ids = [];
		rows.map((item)=>{
			ids.push(item.id)
		})
		Modal.confirm({
			title:"删除提示",
			content:`您确定要删除这些数据吗？${ids.join(',')}`,
			onOk:()=>{
				message.success('删除成功')
			}
		})
	}
	render(){
		const columns = [
			{
				title:'id',
				dataIndex:'id'
			},
			{
				title:'用户名',
				dataIndex:'username'
			},
			{
				title:'性别',
				dataIndex:'sex',
				render(sex){
					return sex==1 ? '男':'女'
				}
			},
			{
				title:'状态',
				dataIndex:'state',
				render(state){
					let config = {
						'1':'咸鱼一条',
						'2':'风华浪子',
						'3':'北大才子',
						'4':'FE',
						'5':'创业者',
					}
					return config[state]
					
				}
			},
			{
				title:'生日',
				dataIndex:'birthday'
			},
			{
				title:'地址',
				dataIndex:'address'
			},
			{
				title:'时间',
				dataIndex:'time'
			}
		]
		const { selectedRowKeys } = this.state
		const rowSelection = {
			type:"radio",
			selectedRowKeys
		}
		const rowCheckSelection = {
			type:'checkbox',
			selectedRowKeys,
			onChange:(selectedRowKeys,selectedRows)=>{
				this.setState({
					selectedRowKeys,
					selectedRows
				})
			}
		}
		return (
			<div>
				<Card title="基础表格">
					<Table
						columns={columns}
						dataSource={this.state.dataSource}
						bordered
						pagination={true}
					/>
				</Card>
				<Card title="动态数据渲染表格" style={{margin:'10px 0'}}>
					<Table
						columns={columns}
						dataSource={this.state.dataSource2}
						bordered
						pagination={true}
					/>
				</Card>
				
				<Card title="单选功能" style={{margin:'10px 0'}}>,
					<div>
						<Button style={{marginBottom:'10px'}} type="primary" onClick={ this.handleDelete }>删除</Button>
					</div>
					<Table
						columns={columns}
						rowSelection={rowCheckSelection}
						onRow={(recode,index) => {
							return {
								onClick:() => {
									this.onRowClick(recode,index);
								}
							}
						}}
						dataSource={this.state.dataSource2}
						bordered
						pagination={this.state.pagination}
					/>
				</Card>
			</div>
		)
	}
}