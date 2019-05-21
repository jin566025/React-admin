import { combineReducers } from 'redux';
import setNavs from './setNavs'
import setUser from './setUser'
import switchMenu from './switchMenu'
import setCurrentKey from './setCurrentKey'
let indexReducer = combineReducers({
	navs:setNavs,
	userName:setUser,
	menuName:switchMenu,
	currentKey:setCurrentKey
})

export default indexReducer;



// reducer数据处理
// import { type } from '../action'
// const initialState = {
// 	menuName:'首页',
// 	userName:'用户名',
// 	navs:[]
// }
// 
// export default (state = initialState,action)=>{
// 
// 	switch (action.type){
// 		case type.SWITCH_MENU:
// 			return {
// 				...state,
// 				menuName:action.menuName
// 			}
// 		case type.SET_USER:
// 			return {
// 				...state,
// 				userName:action.userName
// 			}
// 		case type.SET_NAVS:
// 			return {
// 				...state,
// 				navs:action.navs
// 			}
// 		default:
// 			return {...state};
// 	}
// }
