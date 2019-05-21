export default function setNavs(state = [],action){
	switch (action.type){
		case 'SET_NAVS':
			return action.navs
		default:
			return state;
	}
}