import React,{Component} from 'react'
import { Card,Button,Table,Form,Select,Modal,message,DatePicker  } from 'antd'
import axios from './../../axios'
import utils from './../../util/utils'
import moment from 'moment'
import BaseForm from '../../components/BaseForm'
import MyTable from '../../components/MyTable'

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
export default class Order extends Component{
	state={
		list:[],
		isShowOpenModal:false,
		orderInfo:{}
	}
	params={
		page:1
	}
	formList = [
		{
			type:'SELECT',
			label:'城市',
			placeholder:'全部',
			initialValue:'1',
			width:120,
			field:'city',
			list:[{id:'0',name:'全部'},{id:'1',name:'北京市'},{id:'2',name:'上海市'}]
		},
		{
			type:'时间查询'
		},
		{
			type:'SELECT',
			label:'订单状态',
			placeholder:'全部',
			initialValue:'1',
			width:120,
			field:'order_status',
			list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'1',name:'行程结束'}]
		},
	]
	componentDidMount(){
		this.requestList()
	}
	requestList = ()=>{
		let that = this;
		axios.requestList(that,'/order_list',that.params)
		
	}
	handleDateChange = ()=>{
		
	}
	reset = ()=>{
		this.props.form.resetFields();
	}
	handleClose = ()=>{
		this.setState({isShowOpenModal:false,selectedRowKeys:null,selectedRows:{}})
		this.requestList()
	}
	handleOpen = ()=>{
		let selectedRows = this.state.selectedRows
		if(selectedRows){
			this.setState({isShowOpenModal:true,orderInfo:selectedRows})
		}
		
	}
	onRowClick = (recode,index)=>{
		let selectKey = [index];
		this.setState({
			selectedRowKeys:selectKey,
			selectedRows:recode
		})
	}
	handleFilter = (params)=>{
		console.log("params",params)
		this.requestList()
	}
	openOrderDetail = ()=>{
		let item = this.state.selectedItem;
		if(!item){
			Modal.info({
				title:'信息',
				content:'请先选择一条订单'
			})
			return;
		}
		window.open(`/#/common/order/detail/${item.order_no}`,'_blank')
	}
	render(){
		const { selectedRowKeys } = this.state;
		const rowSelection = {
			type:"radio",
			selectedRowKeys,
			onChange:(selectedRowKeys,selectedRows)=>{
				this.setState({
					selectedRowKeys,
					selectedRows:selectedRows[0]
				})
			}
		}
		const columns = [
			{title:'订单编号',dataIndex:'order_no'},
			{title:'车辆编号',dataIndex:'bike_no'},
			{title:'用户名',dataIndex:'username'},
			{title:'手机号码',dataIndex:'phone'},
			{
				title:'里程',dataIndex:'distance',
				render(distance){
					return `${distance}km`
				}
			},
			{title:'行程时长	',dataIndex:'time'},
			{
				title:'状态',dataIndex:'status',
				render(status){
					return status==1 ? '进行中':'行程结束'
				}
			},
			{title:'开始时间	',dataIndex:'start_time'},
			{title:'结束时间	',dataIndex:'end_time'},
			{title:'订单金额	',dataIndex:'order_price'},
			{title:'实付金额	',dataIndex:'price'}
		]
		const formItemLayout = {
		    labelCol:{span:5},
		    wrapperCol:{span:19}
		}
		
		return (
			<div>
				<Card>
					<BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
				</Card>
				<Card style={{marginTop:10}}>
					<Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
					<Button onClick={this.handleOpen} type="primary" style={{margin:'0 20px'}}>结束订单</Button>
				</Card>
				<div className="content-wrap">
					<MyTable
						updateSelectedItem = {utils.updateSelectedItem.bind(this)}
						columns={columns}
						dataSource={this.state.list}
						pagination={this.state.pagination}
						selectedRowKeys={this.state.selectedRowKeys}
						selectedIds={this.state.selectedIds}
						selectedItem={this.state.selectedItem}
						rowSelection='radio'
					 />

				</div>
				
				<Modal
					title="结束订单"
					visible={this.state.isShowOpenModal}
					onCancel={()=>{
						this.setState({isShowOpenModal:false})
					}}
					onOk={this.handleClose}
				>
					<Form layout="horizontal">
					    <FormItem label="车辆编号" {...formItemLayout}>
					        {this.state.orderInfo.bike_no}
					    </FormItem>
					    <FormItem label="行程开始时间" {...formItemLayout}>
					        {this.state.orderInfo.start_time}
					    </FormItem>
					    <FormItem label="行程结束时间" {...formItemLayout}>
					        {this.state.orderInfo.end_time}
					    </FormItem>
					    <FormItem label="用户" {...formItemLayout}>
					        {this.state.orderInfo.username}
					    </FormItem>
					</Form>
				</Modal>
			</div>
		)
	}
}


























class FilterForm extends Component{
	handleFilterSubmit = ()=>{
		let fieldsValue = this.props.form.getFieldsValue()
		this.props.filterSubmit(fieldsValue)
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol:{
				span:10
			},
			wrapperCol:{
				span:14
			}
		}
		return (
			<Form layout="inline">
				<FormItem label="城市" >
					{
						getFieldDecorator('city_id',{
							initialValue:'1'
						})(
							<Select 
								placeholder="全部"
								style={{width:120}}
							>
								<Option value=''>全部</Option>
								<Option value='1'>北京市</Option>
								<Option value='2'>上海市</Option>
							</Select>
						)
					}
				</FormItem>
				
				<FormItem>
						{
							getFieldDecorator('start_time')(
								<DatePicker placeholder="开始时间" showTime format="YYYY-MM-DD HH:mm:ss" />
							)
						}
				</FormItem>
				<FormItem label="~">
						{
							getFieldDecorator('end_time')(
								<DatePicker  placeholder="结束时间" showTime format="YYYY-MM-DD HH:mm:ss" />
							)
						}
				</FormItem>
				<FormItem label="订单状态" >
					{
						getFieldDecorator('order_status',{
							initialValue:'1'
						})(
							<Select
								placeholder="全部"
								style={{width:120}}
							>
								<Option value=''>全部</Option>
								<Option value='1'>行程结束</Option>
								<Option value='2'>进行中</Option>
							</Select>
						)
					}
				</FormItem>
				
				<FormItem>
					<Button type='primary' style={{margin:'0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
					<Button type=''>重置</Button>
				</FormItem>
			</Form>
		)
	}
}

FilterForm = Form.create({})(FilterForm)