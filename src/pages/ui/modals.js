import React,{Component} from 'react'
import {Card,Button,Modal} from 'antd'
import './ui.less'
export default class Modals extends Component{
	state = {
		showModal1:false,
		showModal2:false,
		showModal3:false,
		showModal4:false
	}
	handleOpen = (type)=>{
		this.setState({[type]:true})
	}
	handleConfirm = (type)=>{
		Modal[type]({
			title:"确认",
			content:'内容',
			onOk(){
				console.log("ok")
			},
			onCancel(){
				console.log("cancel")
			}
		})
	}
	render(){
		return (
			<div>
				<Card title="基础模态框" className="card-wrap">
					<Button type="primary" onClick={()=>this.handleOpen('showModal1')}>Open</Button>
					<Button type="primary" onClick={()=>this.handleOpen('showModal2')}>自定义页脚</Button>
					<Button type="primary" onClick={()=>this.handleOpen('showModal3')}>顶部20px弹窗</Button>
					<Button type="primary" onClick={()=>this.handleOpen('showModal4')}>水平垂直居中</Button>
				</Card>
				<Modal 
					title="提示1"
					visible={this.state.showModal1}
					onCancel={()=>{
						this.setState({
							showModal1:false
						})
					}}
				>
					<p>内容1</p>
				</Modal>
				
				<Modal
					title="提示2"
					visible={this.state.showModal2}
					okText="确定"
					cancelText="取消"
					onCancel={()=>{
						this.setState({
							showModal2:false
						})
					}}
				>
					<p>内容2</p>
				</Modal>
				
				<Modal
					title="提示2"
					style={{top:20}}
					visible={this.state.showModal3}
					onCancel={()=>{
						this.setState({
							showModal3:false
						})
					}}
				>
					<p>内容3</p>
				</Modal>
				
				<Modal
					title="提示4"
					wrapClassName="vertical-center-modal"
					visible={this.state.showModal4}
					onCancel={()=>{
						this.setState({
							showModal4:false
						})
					}}
				>
					<p>内容2</p>
				</Modal>
				
				
				<Card title="信息确认框" className="card-wrap">
					<Button type="primary" onClick={()=>this.handleConfirm('confirm')}>Confirm</Button>
					<Button type="primary" onClick={()=>this.handleConfirm('info')}>Info</Button>
					<Button type="primary" onClick={()=>this.handleConfirm('success')}>Success</Button>
					<Button type="primary" onClick={()=>this.handleConfirm('warning')}>Warning</Button>
				</Card>
				
				
			</div>
		)
	}
}