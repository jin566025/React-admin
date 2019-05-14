import React,{Component} from 'react'
import { Input,Select,Form,Button,Checkbox,Radio,DatePicker } from 'antd'
import utils from '../../util/utils'
const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends Component{
	handleFilterSubmit = ()=>{
		let fieldsValue = this.props.form.getFieldsValue()
		this.props.filterSubmit(fieldsValue)
	}
	reset = ()=>{
	    this.props.form.resetFields();
	}
	initFormList = ()=>{
		const { getFieldDecorator } = this.props.form;
		const formList = this.props.formList;
		const fromItemList = [];
		if(formList && formList.length>0){
			formList.map((item,index)=>{
				
				let label = item.label;
				let field = item.field;
				let initialValue = item.initialValue || '';
				let placeholder = item.placeholder;
				let width = item.width;
				if(item.type=="时间查询"){
					const start_time = <FormItem label="订单时间" key={field}>
						{
							getFieldDecorator('start_time',{
								initialValue:initialValue
							})(
								<DatePicker showTime={true} placeholder='开始时间' format="YYYY-MM-DD" />
							)
						}
					</FormItem>
					fromItemList.push(start_time)
					const end_time = <FormItem label="~" colon={false} key={field}>
						{
							getFieldDecorator('end_time',{
								initialValue:initialValue
							})(
								<DatePicker showTime={true} placeholder='结束时间' format="YYYY-MM-DD" />
							)
						}
					</FormItem>
					fromItemList.push(end_time)
				}
				if(item.type=="城市"){
					const SELECT = <FormItem label="城市" key="city" >
						{
							getFieldDecorator("city",{
								initialValue:"全部"
							})(
								<Select 
									style={{width:120}}
									placeholder={placeholder}
								>
									{utils.getOptionList(item.list)}
								</Select>
							)
						}
					</FormItem>;
					fromItemList.push(SELECT)
				}
				if(item.type=="INPUT"){
					const INPUT = <FormItem label={label} key={field}>
						{
							getFieldDecorator([field],{
								initialValue:initialValue
							})(
								<Input type="text" placeholder={placeholder} />
							)
						}
					</FormItem>
					fromItemList.push(INPUT)
				}else if(item.type=="SELECT"){
					const SELECT = <FormItem label={label} key={field}>
						{
							getFieldDecorator([field],{
								initialValue:initialValue
							})(
								<Select 
									style={{width:width}}
									placeholder={placeholder}
								>
									{utils.getOptionList(item.list)}
								</Select>
							)
						}
					</FormItem>;
					fromItemList.push(SELECT)
				}else if(item.type=="CHECKBOX"){
					const CHECKBOX = <FormItem label={label} key={field}>
						{
							getFieldDecorator([field],{
								valuePropName:'checked',
								initialValue:initialValue
							})(
								<Checkbox>{label}</Checkbox>
							)
						}
					</FormItem>
					fromItemList.push(CHECKBOX)
				}
			})
		}
		return fromItemList
	}
	render(){
		return (
			<Form layout="inline">
				{ this.initFormList() }
				<FormItem>
					<Button type='primary' style={{margin:'0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
					<Button type='' onClick={this.reset}>重置</Button>
				</FormItem>
			</Form>
		)
	}
}
export default FilterForm = Form.create({})(FilterForm)