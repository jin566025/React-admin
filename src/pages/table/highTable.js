import React,{Component} from 'react'
import {Card,Table,Button,Modal,message,Badge} from 'antd'
import axios from './../../axios'
import utils from './../../util/utils'
export default class HighTable extends Component{
	state = {}
	params = {
		page:1
	}
	componentDidMount(){
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
			let dataSource = res.data.result;
			dataSource.map((item,index)=>{
				item.key = index
			})
			this.setState({
				dataSource,
				selectedRowKeys:[],
				selectedRows:null,
				pagination:utils.pagination(res.data,(current)=>{
					that.params.page = current;
					that.request()
				})
			})
		})
	}
	
	handleChange = (pagination,filters,sorter)=>{
		this.setState({
			sortOrder:sorter.order
		})
	}
	
	handleDelete = (item)=>{
		let id = item.id;
		Modal.confirm({
			title:'确认',
			content:'您确认要删除此条数据吗？',
			onOk:()=>{
				message.success('删除成功')
				this.request()
			}
		})
	}
	render(){
		const columns= [
			{
				title:'id',
				key:'id',
				width:80,
				dataIndex:'id',
			},
			{
				title:'用户名',
				key:'username',
				width:80,
				dataIndex:'username'
			},
			{
				title:'性别',
				dataIndex:'sex',
				key:'sex',
				width:80,
				render(sex){
					return sex==1 ? '男':'女'
				}
			},
			{
				title:'状态',
				dataIndex:'state',
				key:'state',
				width:80,
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
				key:'birthday',
				width:80,
				dataIndex:'birthday'
			},
			{
				title:'地址',
				key:'address',
				width:80,
				dataIndex:'address'
			},
			{
				title:'时间',
				key:'time',
				width:80,
				dataIndex:'time'
			}
		]
		const columns2 = [
			{
				title:'id',
				key:'id',
				width:80,
				dataIndex:'id',
				fixed:"left"
			},
			{
				title:'用户名',
				key:'username',
				width:80,
				dataIndex:'username',
				fixed:"left"
			},
			{
				title:'性别',
				dataIndex:'sex',
				key:'sex',
				width:80,
				render(sex){
					return sex==1 ? '男':'女'
				}
			},
			{
				title:'状态',
				dataIndex:'state',
				key:'state',
				width:80,
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
				key:'birthday',
				width:80,
				dataIndex:'birthday'
			},
			{
				title:'地址',
				key:'address',
				width:80,
				dataIndex:'address'
			},
			{
				title:'时间',
				key:'time',
				width:80,
				dataIndex:'time'
			},
			{title:'时间',key:'time',width:80,dataIndex:'time'},
			{title:'时间',key:'time',width:80,dataIndex:'time'},
			{title:'时间',key:'time',width:80,dataIndex:'time'},
			{title:'时间',key:'time',width:80,dataIndex:'time'},
			{title:'时间',key:'time',width:80,dataIndex:'time'},
			{title:'时间',key:'time',width:80,dataIndex:'time'},
			{title:'时间',key:'time',width:80,dataIndex:'time'},
			{title:'时间',key:'time',width:80,dataIndex:'time'},
			{title:'时间',key:'time',width:80,dataIndex:'time'},
			{title:'时间',key:'time',width:80,dataIndex:'time'},
		]
		
		const columns3 = [
			{
				title:'id',
				key:'id',
				width:80,
				dataIndex:'id',
				sorter:(a,b)=>{
					return a.id - b.id
				},
				sortOrder:this.state.sortOrder
			},
			{
				title:'用户名',
				key:'username',
				width:80,
				dataIndex:'username'
			},
			{
				title:'性别',
				dataIndex:'sex',
				key:'sex',
				width:80,
				render(sex){
					return sex==1 ? '男':'女'
				}
			},
			{
				title:'状态',
				dataIndex:'state',
				key:'state',
				width:80,
				render(state){
					let config = {
						'1':<Badge status="success" text="咸鱼一条" />,
						'2':<Badge status="error" text="风华浪子" />,
						'3':<Badge status="processing" text="北大才子" />,
						'4':<Badge status="warning" text="FE" />,
						'5':<Badge status="default" text="创业者" />,
					}
					return config[state]
					
				}
			},
			{
				title:'生日',
				key:'birthday',
				width:80,
				dataIndex:'birthday'
			},
			{
				title:'地址',
				key:'address',
				width:80,
				dataIndex:'address'
			},
			{
				title:'时间',
				key:'time',
				width:80,
				dataIndex:'time'
			},
			{
				title:'操作',
				width:80,
				render:(text,item)=>{
					return <Button type="danger" size="small" onClick={(item)=>{this.handleDelete(item)}}>删除</Button>
				}
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
				<Card title="头部固定">
					<Table
						bordered
						columns={columns}
						dataSource={this.state.dataSource}
						pagination={false}
						scroll={{y:300}}
					/>
				</Card>
				<Card title="左侧固定" style={{margin:'10px 0'}}>
					<Table
						bordered
						columns={columns2}
						dataSource={this.state.dataSource}
						pagination={true}
						scroll={{x:1280}}
					/>
				</Card>
				<Card title="排序" style={{margin:'10px 0'}}>
					<Table
						bordered
						columns={columns3}
						dataSource={this.state.dataSource}
						pagination={true}
						onChange={this.handleChange}
					/>
				</Card>
			</div>
		)
	}
}