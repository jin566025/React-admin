import React,{Component} from 'react'
import { Card,Button,Spin,Icon,Alert } from 'antd'
import './ui.less'
export default class Loading extends Component{
	render(){
		const icon = <Icon type="plus" style={{fontSize:24}} />
		const iconloading = <Icon type="loading" style={{fontSize:24}} />
		return (
			<div>
				<Card title="Spin用法" className="card-wrap">
					<Spin size="small"/>
					<Spin style={{margin:'0 10px'}} />
					<Spin size="large"/>
					<Spin indicator={icon} style={{marginLeft:10}} />
				</Card>
				
				<Card title="内容遮罩" className="card-wrap">
					<Alert 
						message="React"
						description="description"
						type="info"
					/>
					
					
					<Spin>
						<Alert 
							message="React"
							description="description"
							type="warning"
						/>
					</Spin>
					
					<Spin tip="加载中..."  indicator={iconloading}>
						<Alert 
							message="React"
							description="description"
							type="warning"
						/>
					</Spin>
				</Card>
			</div>
		)
	}
}