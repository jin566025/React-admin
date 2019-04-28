import React,{Component} from 'react'
import menuConfig from '../../config/menuConfig.js'
import './index.less'
import { Menu,Icon } from 'antd'
import {NavLink} from 'react-router-dom'
const SubMenu = Menu.SubMenu;
export default class NavLeft extends Component{
	componentWillMount(){
		const menuTreeNode = this.renderMenu(menuConfig)
		this.setState({
			menuTreeNode
		})
	}
	//菜单渲染
	renderMenu =(data)=>{
		return data.map((item)=>{
			if(item.children){
				return (
					<SubMenu title={item.title} key={item.key}>
						{ this.renderMenu(item.children) }
					</SubMenu>
				)
			}
			return <Menu.Item title={item.title} key={item.key}>
				<NavLink to={item.key}>{item.title}</NavLink>
			</Menu.Item>
		})
	}
	render(){
		return(
			<div>
				<div className="logo">
					<img src="/assets/logo.svg" alt="" />
					<h1>React</h1>
				</div>
				<Menu
					theme="dark"
				>
					{this.state.menuTreeNode}
				</Menu>
			</div>
		)
	
	}
}