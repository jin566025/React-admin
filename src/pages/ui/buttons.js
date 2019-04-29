import React,{Component} from 'react'
import {Card,Button,Radio} from 'antd'
import './ui.less'
export default class Buttons extends Component{
	state = {
		loading:true,
		size:"large"
	}
	handleCloseLoading = ()=>{
		this.setState({loading:false})
	}
	
	handleChange = (e)=>{
		this.setState({
			size:e.target.value
		})
	}
	render(){
		return(
			<div>
				<Card title="基础按钮" className="card-wrap">
					<Button type="primary">primary</Button>
					<Button>default</Button>
					<Button type="dashed">dashed</Button>
					<Button type="danger">danger</Button>
					<Button diasbled="true">diasbled</Button>
				</Card>
				
				<Card title="图形按钮" className="card-wrap">
					<Button icon="plus">创建</Button>
					<Button icon="edit">编辑</Button>
					<Button icon="delete" type="dashed">删除</Button>
					<Button icon="search" shape="circle"></Button>
					<Button icon="search" type="primary">搜索</Button>
					<Button icon="download" type="primary">下载</Button>
				</Card>
				
				<Card title="loading按钮" className="card-wrap">
					<Button loading={this.state.loading} type="primary" >确定</Button>
					<Button loading={true}  type="primary" shape="circle"></Button>
					<Button loading={true} >搜索</Button>
					<Button loading={true} shape="circle"></Button>
					<Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
				</Card>
				
				<Card title="按钮组">
					<Button.Group>
						<Button type="primary" icon="left">返回</Button>
						<Button type="primary" icon="right">前进</Button>
					</Button.Group>
				</Card>
				
				<Card title="按钮尺寸" className="card-wrap">
					<Radio.Group onChange={this.handleChange}>
						<Radio value="small">小</Radio>
						<Radio value="default">中</Radio>
						<Radio value="large">大</Radio>
					</Radio.Group>
					<Button type="primary" size={this.state.size}>primary</Button>
					<Button size={this.state.size}>default</Button>
					<Button type="dashed" size={this.state.size}>dashed</Button>
					<Button type="danger" size={this.state.size}>danger</Button>
					<Button diasbled="true" size={this.state.size}>diasbled</Button>
				</Card>
			</div>
		)
	}
}