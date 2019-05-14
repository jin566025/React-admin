import React,{Component} from 'react'
import { Table } from 'antd'

export default class MyTable extends Component{

	onRowClick = (recode,index) =>{
		let rowSelection = this.props.rowSelection;
		if(rowSelection=='checkbox'){
			let selectedRowKeys = this.props.selectedRowKeys;
			let selectedItem = this.props.selectedItem;
			let selectedIds = this.props.selectedIds;
			if(selectedIds){
				const i = selectedIds.indexOf(recode.id)
				if(i==-1){
					selectedIds.push(recode.id);
					selectedRowKeys.push(index)
					selectedItem.push(recode)
				}else{
					selectedIds.splice(i,1);
					selectedRowKeys.splice(i,1);
					selectedItem.splice(i,1);
				}
			}else{
				selectedIds = [recode.id];
				selectedRowKeys = [index];
				selectedItem = [recode]
			}
			
			this.props.updateSelectedItem(selectedRowKeys,selectedItem,selectedIds)
		}else{
			let selectedRowKeys = [index]; 
			let selectedItem = recode;
			this.props.updateSelectedItem(selectedRowKeys,selectedItem)
		}
	}
	tableInit = ()=>{
		let row_selection = this.props.rowSelection;
		let selectedRowKeys = this.props.selectedRowKeys;
		let rowSelection = {
			type:'radio',
			selectedRowKeys,
			onChange:(selectedRowKeys,selectedRows)=>{
				if(row_selection=="checkbox"){
					let selectedIds = []
					selectedRows.map((item,index)=>{
						selectedIds.push(item.id)
					})
					this.props.updateSelectedItem(selectedRowKeys,selectedRows,selectedIds)
				}else{
					this.props.updateSelectedItem(selectedRowKeys,selectedRows[0])
				}
			}
		}
		if(row_selection === false || row_selection===null){
			row_selection = false;
		} else if(row_selection == 'checkbox'){
			rowSelection.type = 'checkbox'
		} else {
			row_selection = 'radio'
		}
		
		return  <Table
					bordered
					{...this.props}
					rowSelection = { row_selection ? rowSelection:null }
					onRow={(recode,index) => {
						return {
							onClick:() => {
								if(row_selection){
									this.onRowClick(recode,index);
								}
								
							}
						}
					}}
				 />
	}

	render(){
		return (
			<div>
				{this.tableInit()}
			</div>
		)
	}
}