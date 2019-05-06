import React,{Component} from 'react'
import {Card,Row,Col,Modal} from 'antd'
export default class Gallery extends Component{
	state={
		visible:false,
		currentImg:""
	}
	openGallery = (imgSrc)=>{
		this.setState({
			visible:true,
			currentImg:"/gallery/"+imgSrc
		})
	}
	render(){
		const imgs = [
			['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'],
			['6.jpg','7.jpg','8.jpg','9.jpg','10.jpg'],
			['11.jpg','12.jpg','13.jpg','14.jpg','16.jpg'],
			['1.jpg','2.jpg','15.jpg','4.jpg','5.jpg']
		]
		const imgList = imgs.map((list,index) => list.map((item,idx)=>
			<Card
				style={{marginBottom:10}}
				cover={<img src={'/gallery/'+item} />}
				onClick={()=>this.openGallery(item)}
			>
				<Card.Meta
					title="React Admin"
					description="react"
				/>
			</Card>
		))
		return (
			<div className="card-wrap">
				<Row gutter={10}>
					<Col md={5}>
						{imgList[0]}
					</Col>
					<Col md={5}>
						{imgList[1]}
					</Col>
					<Col md={5}>
						{imgList[2]}
					</Col>
					<Col md={5}>
						{imgList[3]}
					</Col>
				</Row>
				<Modal
					visible={this.state.visible}
					title="图片画廊"
					onCancel={()=>{
						this.setState({
							visible:false
						})
					}}
					footer={null}
				>
					<img 
						src={''+this.state.currentImg}
						style={{width:"100%"}}
						alt="" 
					/>
				</Modal>
			</div>
		);
	}
}