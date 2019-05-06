import React,{Component} from 'react'
import { HashRouter,Route,Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin.js'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Notification from './pages/ui/notice'
import Loadings from './pages/ui/loadings'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import FormLogin from './pages/form/login'
import NoMatch from './pages/nomatch'

export default class IRouter extends Component{
	render(){
		return (
			<HashRouter>
				<App>
					<Route path="/login" component={Login} />
					<Route path="/admin" render={()=>
						<Admin>
							<Switch>
								<Route path="/admin/ui/buttons" component={Buttons} />
								<Route path="/admin/ui/modals" component={Modals} />
								<Route path="/admin/ui/loadings" component={Loadings} />
								<Route path="/admin/ui/notification" component={Notification} />
								<Route path="/admin/ui/messages" component={Messages} />
								<Route path="/admin/ui/gallery" component={Gallery} />
								<Route path="/admin/ui/tabs" component={Tabs} />
								<Route path="/admin/form/login" component={FormLogin} />
								<Route component={NoMatch} />
							</Switch>
							
						</Admin>
					} />
				</App>
			</HashRouter>
		);
	}
}