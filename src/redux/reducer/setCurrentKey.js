export default function setCurrentKey(state='',action){
	switch (action.type){
		case 'SET_CURRENT_KEY':
			return action.currentKey
		default:
			return state;
	}
}