// import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import Home from "./Home";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import NotFound from "./components/NotFound";
import Home0 from "./Home0";

const App: React.FC = () => {
	return (
		<Router>
			<AuthProvider>
				<Switch>
					<Route exact path="/" component={Home0} />
					<Route path="/notes" component={Home} />
					<Route exact path="/signUp" component={SignUp} />
					<Route exact path="/login" component={Login} />
					<Route component={NotFound} />
				</Switch>
			</AuthProvider>
		</Router>
	);
};

export default App;
