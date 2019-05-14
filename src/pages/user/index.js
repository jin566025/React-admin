import React,{Component} from 'react'
import {Card,Form,Input,Button,Table,Modal,Select,Radio,DatePicker} from 'antd'
import MyTable from '../../components/MyTable'
import axios from '../../axios'
import utils from '../../util/utils'
import Moment from 'moment'
import BaseForm from'../../components/BaseForm'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

export default class User extends Component{
	state = {
		userInfo:{}
	}
	params={
		page:1
	}
	
	formList = [
		{
			type:'INPUT',
			label:'用户名',
			placeholder:'请输入用户名',
			initialValue:'',
			width:120,
			field:'username'
		}
	]
	componentDidMount(){
		this.requestList()
	}
	requestList = ()=>{
		let that = this;
		axios.requestList(that,'/user_list',that.params)
	}
	handleSubmit = ()=>{
		let type = this.state.type;
		let data = this.userForm.props.form.getFieldsValue();
		this.setState({
		    isVisible:false
		})
		this.requestList();
	}
	handleOperator =(type)=>{
		let item = this.state.selectedItem;
		if(type=='create'){
			this.setState({
				type,
				isVisible:true,
				title:'创建员工'
			})
		}else if(type=='edit' || type=='detail'){
			console.log(item)
			 if(!item){
			    Modal.info({
			        title: '信息',
			        content: '请选择一个用户'
			    })
			    return;
			}
			this.setState({
			    title:type=='edit'?'编辑用户':'查看详情',
			    isVisible:true,
			    userInfo:item,
			    type
			})
		}else if(type=='delete'){
			if(!item){
			    Modal.info({
			        title: '信息',
			        content: '请选择一个用户'
			    })
			    return;
			}
			Modal.confirm({
			    title:'确定要删除此用户吗？',
			    onOk:()=>{
			        this.setState({
			            isVisible:false
			        })
			        this.requestList();
			    }
			})
		}
		
	}
	
	handleFilter = (params)=>{
		console.log("params",params)
		this.requestList()
	}
	render(){
		const columns = [
			{title:'id',dataIndex:'id'},
			{title:'用户名',dataIndex:'username'},
			{title:'性别',dataIndex:'sex',
				render(sex){
					return sex==1 ? '男':'女'
				}
			},
			{title:'状态',dataIndex:'state',
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
			  title: '爱好',
			  dataIndex: 'interest',
			  render(interest){
			      let config = {
			          '1':'游泳',
			          '2':'打篮球',
			          '3':'踢足球',
			          '4':'跑步',
			          '5':'爬山',
			          '6':'骑行',
			          '7':'桌球',
			          '8':'麦霸'
			      }
			      return config[interest];
			  }
			},
			{title:'生日',dataIndex:'birthday'},
			{title:'地址',dataIndex:'address'},
			{title:'时间',dataIndex:'time'}
		]
		return (
			<div>
				<Card>
					<BaseForm  formList={this.formList} filterSubmit={this.handleFilter} />
				</Card>
				<Card style={{marginTop:10}}>
					<Button type="primary" onClick={()=>this.handleOperator('create')}>创建员工</Button>
					<Button type="primary" onClick={()=>this.handleOperator('edit')} style={{marginLeft:'20px'}}>编辑员工</Button>
					<Button type="primary"  onClick={()=>this.handleOperator('detail')} style={{marginLeft:'20px'}}>员工详情</Button>
					<Button type="danger"  onClick={()=>this.handleOperator('delete')} style={{marginLeft:'20px'}}>删除员工</Button>
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
					title={ this.state.title }
					width={800}
					visible={ this.state.isVisible }
					onCancel={()=>{
						this.setState({isVisible:false})
					}}
					onOk={this.handleSubmit}
				>
					<CreateForm  userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={ (inst)=>this.userForm = inst } />
				</Modal>

			</div>
		)
	}
}
class CreateForm extends Component{
	getState = (state)=>{
	    return {
	        '1':'咸鱼一条',
	        '2':'风华浪子',
	        '3':'北大才子一枚',
	        '4':'百度FE',
	        '5':'创业者'
	    }[state]
	}
	render(){
		const formItemLayout = {
			labelCol:{
				span:5
			},
			wrapperCol:{
				span:15
			}
		}
		const { getFieldDecorator } = this.props.form;
		const userInfo = this.props.userInfo;
		const type = this.props.type;
		
		return (
			<Form layout="horizontal">
				<FormItem label="姓名" {...formItemLayout}>
					{	
						userInfo && type=='detail' ? userInfo.username:
						getFieldDecorator('username',{
							initialValue:userInfo.username,
							rules:[
								{
									required:true,
									message:"请输入姓名"
								}
							]
						})(
							<Input placeholder="请输入姓名" />
						)
					}
				</FormItem>
				<FormItem label="性别" {...formItemLayout}>
				    {
				        userInfo && type=='detail'?userInfo.sex==1?'男':'女':
				        getFieldDecorator('sex',{
				            initialValue:userInfo.sex
				        })(
				        <RadioGroup>
				            <Radio value={1}>男</Radio>
				            <Radio value={2}>女</Radio>
				        </RadioGroup>
				    )}
				</FormItem>
				<FormItem label="状态" {...formItemLayout}>
					{	
						userInfo && type=='detail' ? this.getState(userInfo.state):
						getFieldDecorator('state',{
                            initialValue:userInfo.state
                        })(
							<Select>
								<Option value={1}>咸鱼一条</Option>
								<Option value={2}>风华浪子</Option>
								<Option value={3}>北大才子</Option>
								<Option value={4}>FE</Option>
								<Option value={5}>创业者</Option>
							</Select>
						)
					}
				</FormItem>
				<FormItem label="生日" {...formItemLayout}>
					{
						userInfo && type=='detail' ? userInfo.birthday:
						getFieldDecorator('birthday',{
							initialValue:Moment(userInfo.birthday)
						})(
							 <DatePicker />
						)
					}
				</FormItem>
				<FormItem label="联系地址" {...formItemLayout}>
					{
						userInfo && type=="detail" ? userInfo.address:
						getFieldDecorator('detail',{
							initialValue:userInfo.address
						})(
							 <Input.TextArea rows={3} placeholder="请输入联系地址"/>
						)
					}
				</FormItem>
			</Form>
		)
	}
}
CreateForm = Form.create({})(CreateForm)


