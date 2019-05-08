import React,{Component} from 'react'
import {
	Card,
	Form,
	Button,
	Input,
	Checkbox,
	Radio,
	Select,
	Switch,
	DatePicker,
	TimePicker,
	Upload,
	Icon,
	message,
	InputNumber,
	
} from 'antd'
import moment from 'moment'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
class FormRegister extends Component{
	state = {}
	handleSubmit = ()=>{
		let userInfo = this.props.form.getFieldsValue();
		console.log("userinfo",userInfo)
	}
	getBase64 = (img,callback) => {
		const reader = new FileReader();
		reader.addEventListener('load',() => callback(reader.result));
		reader.readAsDataURL(img);
	}
	handleChange = (info) =>{
		if(info.file.status==='uploading'){
			this.setState({loading:true});
		}
		if(info.file.status==='done'){
			this.getBase64(info.file.originFileObj,imageUrl => this.setState({
				userImg:imageUrl,
				loading:false
			}))
		}
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol:{
				xs:24,
				sm:4
			},
			wrapperCol:{
				xs:24,
				sm:12
			}
		}
		const offsetLayout = {
			wrapperCol:{
				xs:24,
				sm:{
					span:12,
					offset:4
				}
			}
		}
		return (
			<div>
				<Card title="注册表单">
					<Form layout="horizontal" >
						<FormItem label="用户名" {...formItemLayout}>
							{
								getFieldDecorator('username',{
									initialValue:'',
									rules:[
										{
											required:true,
											message:"用户名不能为空"
										}
									]
								})(
									<Input placeholder="请输入用户名" />
								)
							}
						</FormItem>
						
						<FormItem label="密码" {...formItemLayout}>
							{
								getFieldDecorator('password',{
									initialValue:'',
									rules:[
										{
											required:true,
											message:"密码不能为空"
										}
									]
								})(
									<Input placeholder="请输入密码" />
								)
							}
						</FormItem>
						<FormItem label="性别" {...formItemLayout}>
							{
								getFieldDecorator('sex',{
									initialValue:'',
								})(
									<RadioGroup>
										<Radio value="1">男</Radio>
										<Radio value="2">女</Radio>
									</RadioGroup>
								)
							}
						</FormItem>
						<FormItem label="年龄" {...formItemLayout}>
							{
								getFieldDecorator('age',{
									initialValue:'18',
								})(
									<InputNumber />
								)
							}
						</FormItem>
						<FormItem label="当前状态" {...formItemLayout}>
							{
								getFieldDecorator('state',{
									initialValue:'1',
								})(
									<Select>
										<Option value="1">咸鱼一条</Option>
										<Option value="2">风华浪子</Option>
										<Option value="3">北大才子</Option>
										<Option value="4">FE</Option>
										<Option value="5">创业者</Option>
									</Select>
								)
							}
						</FormItem>
						<FormItem label="爱好" {...formItemLayout}>
							{
								getFieldDecorator('interest',{
									initialValue:['1','7'],
								})(
									<Select mode="multiple">
										<Option value="1">篮球</Option>
										<Option value="2">足球</Option>
										<Option value="3">爬山</Option>
										<Option value="4">跑步</Option>
										<Option value="5">骑行</Option>
									</Select>
								)
							}
						</FormItem>
						<FormItem label="是否已婚" {...formItemLayout}>
							{
								getFieldDecorator('isMarry',{
									valuePropName:'checked',
									initialValue:true,
								})(
									<Switch />
								)
							}
						</FormItem>
						
						<FormItem label="生日" {...formItemLayout}>
							{
								getFieldDecorator('birthday',{
									initialValue:moment('2018-08-08'),
								})(
									<DatePicker />
								)
							}
						</FormItem>
						<FormItem label="联系地址" {...formItemLayout}>
							{
								getFieldDecorator('address',{
									initialValue:'宁波市',
								})(
									<TextArea 
										autosize={
											{
												minRows:4,
												maxRows:8
											}
										}
									/>
								)
							}
						</FormItem>
						<FormItem label="早起时间" {...formItemLayout}>
							{
								getFieldDecorator('time')(
									<TimePicker />
								)
							}
						</FormItem>
						<FormItem label="头像" {...formItemLayout}>
							{
								getFieldDecorator('userImg')(
									<Upload
										listType="picture-card"
										showUploadList={false}
										onChange={this.handleChange}
										action="http://fireapitest.51tjs.cn/fire-upload/upload"
									>
									{this.state.userImg?<img src={this.state.userImg} />:<Icon type="plus" />}
									</Upload>
								)
							}
						</FormItem>
						
						<FormItem {...offsetLayout}>
							{
								getFieldDecorator('checked')(
									<Checkbox>我已阅读协议</Checkbox>
								)
							}
						</FormItem>
						<FormItem {...offsetLayout}>
							<Button type="primary" onClick={this.handleSubmit}>注册</Button>
						</FormItem>
					</Form>
				</Card>
			</div>
		)
	}
}
export default Form.create()(FormRegister);