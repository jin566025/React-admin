import React,{Component} from 'react'
import { HashRouter,Route,Switch,Redirect } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Home from './pages/home'
import Admin from './admin.js'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Notification from './pages/ui/notice'
import Loadings from './pages/ui/loadings'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import NoMatch from './pages/nomatch'
import BasicTable from './pages/table/basic'
import HighTable from './pages/table/highTable' 
import City from './pages/city/index'
import Order from './pages/order/index'
import OrderDetail from './pages/order/detail'
import User from './pages/user/index'
import BikeMap from './pages/map/index'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import Rich from './pages/rich/index'
import Permission from './pages/permission/index'
import Common from './common.js'
export default class IRouter extends Component{
	render(){
		return (
			<HashRouter>
				<App>
					<Route exact path="/" render={() => <Redirect to="/admin/home" push />} /> 
					<Route path="/login" component={Login} />
					<Route path="/admin" render={()=>
						<Admin>
							<Switch>
								<Route path="/admin/home" component={Home} />
								<Route path="/admin/ui/buttons" component={Buttons} />
								<Route path="/admin/ui/modals" component={Modals} />
								<Route path="/admin/ui/loadings" component={Loadings} />
								<Route path="/admin/ui/notification" component={Notification} />
								<Route path="/admin/ui/messages" component={Messages} />
								<Route path="/admin/ui/gallery" component={Gallery} />
								<Route path="/admin/ui/tabs" component={Tabs} />
								<Route path="/admin/form/login" component={FormLogin} />
								<Route path="/admin/form/reg" component={FormRegister} />
								<Route path="/admin/table/basic" component={BasicTable} />
								<Route path="/admin/table/high" component={HighTable} />
								<Route path="/admin/city" component={City} />
								<Route path="/admin/order" component={Order} />
								<Route path="/admin/user" component={User} />
								<Route path="/admin/bikeMap" component={BikeMap} />
								<Route path="/admin/charts/bar" component={Bar} />
								<Route path="/admin/charts/pie" component={Pie} />
								<Route path="/admin/charts/line" component={Line} />
								<Route path="/admin/rich" component={Rich} />
								<Route path="/admin/permission" component={Permission} />

								<Route component={NoMatch} />
							</Switch>
							
						</Admin>
					} />
					<Route path='/common' render={()=>
							<Common>
								<Route path="/common/order/detail/:orderId" component={OrderDetail} />
							</Common>
						}
					/>
				</App>
			</HashRouter>
		);
	}
}