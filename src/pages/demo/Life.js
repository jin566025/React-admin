import React,{Component} from 'react';
import './life.less'
export default class Life extends Component{
	constructor(props){
		super(props);
		this.state = {
			count:0
		}
	}
	handleClick=()=>{
		this.setState({count:1})
	}
	render(){
		return (
			<div>
				<p className="content">react生命周期</p>
				<div>{this.state.count}</div>
				<div onClick={this.handleClick}>点击一下</div>
			</div>
		)
	}
}