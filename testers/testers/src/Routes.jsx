import React from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'
import Sse from './Pages/Sse'
import Login from './Pages/Login'
import Register from './Pages/Register'

const Authed = ({path, exact, component}) => {
	return localStorage.getItem("jwt") ? <Route path={path} exact={exact} component={component} /> : <Redirect to="/login" />
}

const Routes = () => (
	<Switch>
		<Authed path="/sse" exact component={Sse} />
		<Route path="/login" exact component={Login} />
		<Route path="/register" exact component={Register} />
	</Switch>
)

export default Routes