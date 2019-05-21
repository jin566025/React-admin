export default function setUser(state = '用户名',action){
	switch (action.type){
		case 'SET_USER':
			return action.userName
		default:
			return state;
	}
}