import React,{Component} from 'react'
// import menuConfig from '../../config/menuConfig.js'
import './index.less'
import { Menu,Icon } from 'antd'
import { NavLink,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from '../../redux/action/switchMenu'
import { setCurrentKey } from '../../redux/action/setCurrentKey'
const SubMenu = Menu.SubMenu;
class NavLeft extends Component{
	state = {
		currentKey:''
	}
	componentWillMount(){
		let menuConfig = this.props.navs;
		const menuTreeNode = this.renderMenu(menuConfig)
		let currentKey = window.location.hash.replace(/#|\?.*$/g,'');
		
		let currentTitle = this.returnCurrentTitle(currentKey,menuConfig)
		this.dispatchMenu(currentTitle,currentKey)
		this.setState({
			// currentKey,
			menuTreeNode
		})
	}
	returnCurrentTitle(currentKey,list){
		if(!list){
			return false;
		}
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
		if(data.length>0){
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
		}else{
			return (<Redirect to="/login" />)
		}
		
	}
	handleClick = ({item,key})=>{
		if (key == this.props.currentKey) {
		    return false;
		}
		// 事件派发，自动调用reducer，通过reducer保存到store对象中
		this.dispatchMenu(item.props.title,key)
		// this.setState({currentKey:key})
	}
	dispatchMenu(title,key){
		const { dispatch }  = this.props;
		dispatch(switchMenu(title))
		dispatch(setCurrentKey(key))
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
					selectedKeys={[this.props.currentKey]}
					theme="dark"
				>
					{this.state.menuTreeNode}
				</Menu>
			</div>
		)
	
	}
}
const mapStateToProps = state =>{
	if(state){
		return {
			navs:state.navs,
			currentKey:state.currentKey
		}
	}
}
export default connect(mapStateToProps)(NavLeft);