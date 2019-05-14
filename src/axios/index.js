import JsonP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'
import utils from '../util/utils'
export default class Axios{
	static requestList(that,url,params){
		var data = {
			params:params
		}
		this.ajax({
			url,
			data
		}).then(res=>{
			if(res){
				that.setState({
					list:res.data.result.map((item,index)=>{
						item.key = index
						return item
					}),
					pagination:utils.pagination(res.data,(current)=>{
						that.params.page = current;
						that.requestList()
					})
				})
			}
		})
	}
	static jsonp(options){
		return new Promise((resolve,reject)=>{
			JsonP(options.url,{
				params:'callback',
				
			},function(err,response){
				resolve(response)
				reject(err)
			})
		})
	}
	static ajax(options){
		let loading;
		if(options.data && options.data.isShowLoadig !== false){
			loading = document.getElementById("loading")
			loading.style.display = 'block'
		}
		return new Promise((resolve,reject)=>{
			
			axios({
				url:options.url,
				method:'get',
				baseURL:"https://www.easy-mock.com/mock/5cd13e60bbe6b75014dac643/reactapi",
				timeout:5000,
				params:(options.data && options.data.params) || ''
			}).then(res=>{
				if(res.status=="200"){
					if(res.data.code=='0'){
						resolve(res)
						loading.style.display = 'none'
					}else{
						Modal.info({
							title:"提示",
							content:res.data.msg
						})
					}
				}else{
					reject(res)
				}
			})
		})
	}
}