import React,{Component} from 'react'
import {Card,Button,Modal,Form,Input,Select,Tree,Transfer} from 'antd'
import MyTable from '../../components/MyTable'
import axios from '../../axios'
import utils from '../../util/utils'
import BaseForm from '../../components/BaseForm'
import menuConfig from '../../config/menuConfig'
const Option = Select.Option;
const FormItem = Form.Item
const TreeNode = Tree.TreeNode
export default class Permission extends Component{
	params = {
		page:1
	}
	state = {}
	requestList = ()=>{
		let that = this;
		axios.requestList(that,'/role_list',that.params)
	}
	componentWillMount(){
		this.requestList()
	}
	handleSubmit = ()=>{
		let createInfo = this.createInfo.props.form.getFieldsValue()
		this.createInfo.props.form.validateFields((err,values)=>{
			if(!err){
				this.setState({isVisible:false})
				this.createInfo.props.form.resetFields();
			}
		})
	}
	handleRoleSubmit = ()=>{
		let item = this.state.selectedItem;
		if(!item){
			Modal.info({text:"请选择一个角色"})
			return;
		}
		this.setState({
			isPermVisible:true,
			detailInfo:item,
			menuInfo:item.menus
		})
	}
	handleUserAuth = ()=>{
		let item = this.state.selectedItem;
		if(!item){
			Modal.info({text:"请选择一个角色"})
			return;
		}
		this.setState({
			isUserVisible:true,
			detailInfo:item
		})
		this.getRoleUserList(item.id)
	}
	handleUserSubmit = ()=>{
		let data = {};
		data.user_ids = this.state.targetKeys;
		data.role_id = this.state.selectedItem.id;
		console.log(data)
	}
	getRoleUserList = (id)=>{
		axios.ajax({
			url:'/user_role_list',
			data:{
				params:{id}
			}
		}).then(res=>{
			
			this.getAuthUserList(res.data.result)
		})
	}
	getAuthUserList = (list)=>{
		const mockData = []
		const targetKeys = [];
		if(list && list.length>0){
			list.map((item,idx)=>{
				const obj = {
					key:item.user_id,
					title:item.user_name,
					status:item.status
				}
				if(obj.status == 1){
					targetKeys.push(obj.key)
				}
				mockData.push(obj)
				
			})
			this.setState({mockData,targetKeys})
		}
	}
	handlePermEditSubmit = ()=>{
		let data = this.permForm.props.form.getFieldsValue();
		let menuInfo = this.state.menuInfo
		console.log(menuInfo)
		this.setState({isPermVisible:false})
	}
	render(){
		const columns = [
			{title:'角色ID',dataIndex:'id'},
			{title:'角色名称',dataIndex:'role_name'},
			{title:'创建时间',dataIndex:'create_time',render(create_time){
				return utils.formateDate(create_time)
			}},
			{title:'使用状态',dataIndex:'status',render(status){
				let config = {
					'0':'停用',
					'1':'启用'
				}
				return config[status]
			}},
			{title:'创建时间',dataIndex:'authorize_time',render(authorize_time){
				return utils.formateDate(authorize_time)
			}},
			{title:'授权人',dataIndex:'authorize_user_name'},
		]
		
		return (
			<div>
				<Card>
					<Button type="primary" onClick={()=>{this.setState({isVisible:true})}}>创建角色</Button>
					<Button type="primary" onClick={this.handleRoleSubmit} style={{marginLeft:20}}>设置权限</Button>
					<Button type="primary" onClick={this.handleUserAuth} style={{marginLeft:20}}>用户授权</Button>
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
					visible={this.state.isVisible}
					width={500}
					title="创建角色"
					onCancel={()=>{
						this.setState({isVisible:false})
					}}
					onOk={this.handleSubmit}
				>
					<CreateForm wrappedComponentRef={(inst)=> this.createInfo = inst} />
				</Modal>
				
				<Modal 
					title="设置权限"
					visible={this.state.isPermVisible}
					width={600}
					onOk={this.handlePermEditSubmit}
					onCancel={()=>{
						this.setState({isPermVisible:false})
					}}
				>
					<PerEditForm 
						detailInfo={this.state.detailInfo} 
						menuInfo={this.state.menuInfo}
						patchMenuInfo={(key)=>{
							this.setState({menuInfo:key})
						}}
						wrappedComponentRef={(inst)=>this.permForm = inst}
					/>
				</Modal>
				
				
				<Modal 
					title="用户授权"
					visible={this.state.isUserVisible}
					width={800}
					onOk={this.handleUserSubmit}
					onCancel={()=>{
						this.setState({isUserVisible:false})
					}}
				>
					<RoleAuthForm 
						detailInfo={this.state.detailInfo} 
						targetKeys={this.state.targetKeys}
						mockData={this.state.mockData}
						patchUserInfo={(targetKeys)=>{
							this.setState({targetKeys})
						}}
						wrappedComponentRef={(inst)=>this.userAuthForm = inst}
					/>
				</Modal>
			</div>
		)
	}
}

class RoleAuthForm extends Component{
	

	filterOption = (inputValue,option)=>{
		return option.title.indexOf(inputValue) > -1;
	}
	
	handleChange = (targetKeys)=>{
		this.props.patchUserInfo(targetKeys)
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol:{
				span:5
			},
			wrapperCol:{
				span:15
			}
		}
		const detail_info = this.props.detailInfo;
		const menuInfo = this.props.menuInfo;
		return (
			<Form layout="horizontal" {...formItemLayout}>
				<FormItem label="角色名称">
					<Input disabled placeholder={detail_info.role_name} />
				</FormItem>
				<FormItem label="选择用户">
					<Transfer
						listStyle={{width:200,height:400}}
						dataSource={this.props.mockData}
						titles={['待选用户','已选用户']}
						searchPlaceHolder='输入用户名'
						showSearch
						filterOption={this.filterOption}
						targetKeys={this.props.targetKeys}
						onChange={this.handleChange}
						render={item=>item.title}
					>
					</Transfer>
				</FormItem>
				

			</Form>
		)
	}
}
RoleAuthForm = Form.create({})(RoleAuthForm)


class CreateForm extends Component{
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
		return (
			<Form layout="horizontal">
				<FormItem label="角色名称" {...formItemLayout}>
					{
						getFieldDecorator('role_name',{
							initialValue:'',
							rules:[
								{
									required:true,
									message:"请输入角色名称"
								}
							]
						})(
							<Input placeholder="请输入角色名称"  />
						)
					}
				</FormItem>
				<FormItem label="状态" {...formItemLayout}>
					{
						getFieldDecorator('status',{
							initialValue:'1',
							rules:[
								{
									required:true,
									message:"请选择角色状态"
								}
							]
						})(
							<Select>
								<Option value="0">启用</Option>
								<Option value="1">停用</Option>
							</Select>
						)
					}
				</FormItem>
			</Form>
		)
	}
}

CreateForm = Form.create({})(CreateForm)

class PerEditForm extends Component{
	renderTreeNodes = (menuConfig)=>{
		return menuConfig.map((item)=>{
			if(item.children){
				return <TreeNode title={item.title} key={item.key}>
					{this.renderTreeNodes(item.children)}
				</TreeNode>
			}else{
				return <TreeNode  {...item} />
			}
		})
	}
	onCheck = (key)=>{
		this.props.patchMenuInfo(key)
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol:{
				span:5
			},
			wrapperCol:{
				span:15
			}
		}
		const detail_info = this.props.detailInfo;
		const menuInfo = this.props.menuInfo;
		return (
			<Form layout="horizontal" {...formItemLayout}>
				<FormItem label="角色名称">
					<Input disabled placeholder={detail_info.role_name} />
				</FormItem>
				
				<FormItem label="状态">
					{
						getFieldDecorator('status',{
							initialValue:'1'
						})(
							<Select>
								<Option value="1">启用</Option>
								<Option value="2">禁用</Option>
							</Select>
						)
					}
					
				</FormItem>
				
				<Tree
					checkable
					defaultExpandAll
					onCheck={(checkKeys)=>{
						this.onCheck(checkKeys)
					}}
					checkedKeys={menuInfo}
				>
					<TreeNode title="平台权限" key="plateform_all">
						{this.renderTreeNodes(menuConfig)}
					</TreeNode>
				</Tree>
			</Form>
		)
	}
}
PerEditForm = Form.create({})(PerEditForm)