import React,{Component} from 'react'
import {Card,Button,Tabs,message,Icon} from 'antd'
import './ui.less'
const TabPane = Tabs.TabPane;
export default class Tab extends Component{

	handleCallback = (key)=>{
		message.info("hello")
	}
	onChange = (activeKey)=>{
		this.setState({activeKey})
	}
	onEdit = (targetKey,action)=>{
		this[action](targetKey);
	}
	add = ()=>{
		const panes = this.state.panes;
		const activeKey = String(panes.length+1)
		panes.push({title:`New Tab${activeKey}`,content:`New Tab Pane${activeKey}`,key:activeKey});
		this.setState({panes,activeKey})
	}
	remove = (targetKey)=>{
		let activeKey = this.state.activeKey;
		let lastIndex;
		this.state.panes.forEach((pane,i)=>{
			if(pane.key === targetKey){
				lastIndex = i-1
			}
		})
		const panes = this.state.panes.filter(pane => pane.key !== targetKey);
		if(lastIndex >=0 && activeKey===targetKey){
			activeKey = panes[lastIndex].key;
		}
		this.setState({panes,activeKey})
	}
	componentWillMount(){
		const panes = [
			{title:'tab 1',content:'tab 1',key:'1'},
			{title:'tab 2',content:'tab 2',key:'2'},
			{title:'tab 3',content:'tab 3',key:'3'},
		]
		this.setState({
			activeKey:panes[0].key,
			panes
		})
	}
	render(){
		return (
			<div>
				<Card title="tab页签" className="card-wrap">
					<Tabs defaultActiveKey="1" onChange={this.handleCallback}>
						<TabPane tab="Tab 1" key="1">TabPane 1</TabPane>
						<TabPane tab="Tab 2" key="2">TabPane 2</TabPane>
						<TabPane tab="Tab 3" key="3">TabPane 3</TabPane>
					</Tabs>
				</Card>
				
				<Card title="tab带图的页签" className="card-wrap">
					<Tabs defaultActiveKey="1" onChange={this.handleCallback}>
						<TabPane tab={<span><Icon type="plus" />tab 1</span>} key="1">TabPane 1</TabPane>
						<TabPane tab={<span><Icon type="edit" />tab 2</span>} key="2">TabPane 2</TabPane>
						<TabPane tab={<span><Icon type="delete" />tab 3</span>} key="3">TabPane 3</TabPane>
					</Tabs>
				</Card>
				
				<Card title="tab带图的页签" className="card-wrap">
					<Tabs 
						onChange={this.onChange}
						activeKey={this.state.activeKey}
						onEdit={this.onEdit}
						type="editable-card"
					>
						{
							this.state.panes.map((panel)=>{
								return <TabPane 
									tab={panel.title}
									key={panel.key}
								/>
							})
						}
					</Tabs>
				</Card>
			</div>
		)
	}
}