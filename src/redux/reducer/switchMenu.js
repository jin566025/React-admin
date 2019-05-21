export default function switchMenu(state = '首页',action){
	switch (action.type){
		case 'SWITCH_MENU':
			return action.menuName

		default:
			return state;
	}
}