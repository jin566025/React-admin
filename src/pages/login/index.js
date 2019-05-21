import React,{Component} from 'react';
import { Form,Input,Button,Icon,Checkbox } from 'antd'
import './index.less'
import axios from '../../axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser } from '../../redux/action/setUser'
import { setNavs } from '../../redux/action/setNavs'
const FormItem = Form.Item;


class Login extends Component{
	
	submit = () =>{
		this.props.form.validateFields((err,values)=>{
			if(!err){
				axios.ajax({
					url:'/login',
					data:{
						params:{
							values
						}
					}
				}).then(res=>{
					let result = res.data;
					const { dispatch }  = this.props;
					dispatch(setUser(result.username))
					dispatch(setNavs(result.menus))
					this.props.history.push('/admin/home')
				})
			}
		})
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		return (
			<div >
				<Form className="form-content">
					<FormItem>
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
								<Input prefix={<Icon type="user" />} placeholder="Username" />
							)
						}
					</FormItem>
					<FormItem>
						{
							getFieldDecorator('password',{
								initialValue:'',
								rules:[
									{
										required:true,
										message:'密码不能为空'
									}
								]
							})(
								<Input prefix={<Icon type="lock" />} placeholder="Password" />
							)
						}
					</FormItem>
					<FormItem>
						{
							getFieldDecorator('remember',{
								valuePropName: 'checked',
								initialValue: true,
							})(<Checkbox>Remember me</Checkbox>)
						}
						<a className="login-form-forgot" href="">
							Forgot password
						</a>
						<Button onClick={this.submit} className="submit-btn" type="primary">Log in</Button>
						Or <a href="">register now!</a>
					</FormItem>
				</Form>
			</div>
		)
	}
}

const LoginPage = Form.create()(Login)
export default connect()(LoginPage);