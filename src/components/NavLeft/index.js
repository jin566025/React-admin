import React,{Component} from 'react'
import menuConfig from '../../config/menuConfig.js'
import './index.less'
import { Menu,Icon } from 'antd'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from '../../redux/action'
const SubMenu = Menu.SubMenu;
class NavLeft extends Component{
	
	state = {
		currentKey:''
	}
	componentWillMount(){
		const menuTreeNode = this.renderMenu(menuConfig)
		let currentKey = window.location.hash.replace(/#|\?.*$/g,'');
		
		let currentTitle = this.returnCurrentTitle(currentKey,menuConfig)
		this.dispatchMenu(currentTitle)
		this.setState({
			currentKey,
			menuTreeNode
		})
	}
	returnCurrentTitle(currentKey,list){
		let currentTitle = ''
		outloop:
		for(let i=0;i<list.length;i++){
			if(currentKey==list[i].key){
				currentTitle = list[i].title;
				break;
			}else if(list[i].children){
				for(let j=0;j<list[i].children.length;j++){
					if(currentKey==list[i].children[j].key){
						currentTitle = list[i].children[j].title;
						break outloop;
					}
				}
			}else{
				currentTitle = ''
			}
		}
		
		return currentTitle
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
	handleClick = ({item,key})=>{
		if (key == this.state.currentKey) {
		    return false;
		}
		// 事件派发，自动调用reducer，通过reducer保存到store对象中
		this.dispatchMenu(item.props.title)
		this.setState({currentKey:key})
	}
	dispatchMenu(title){
		const { dispatch }  = this.props;
		dispatch(switchMenu(title))
	}
	render(){
		return(
			<div>
				<div className="logo">
					<img src="/assets/logo.svg" alt="" />
					<h1>React</h1>
				</div>
				<Menu
					onClick={this.handleClick}
					selectedKeys={[this.state.currentKey]}
					theme="dark"
				>
					{this.state.menuTreeNode}
				</Menu>
			</div>
		)
	
	}
}

export default connect()(NavLeft);