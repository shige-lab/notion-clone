// import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./AuthContext";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import NotFound from "./NotFound";

const App: React.FC = () => {
	return (
		<Router>
			<AuthProvider>
				<Switch>
					<Route path="/notes" component={Home} />
					{/* <Route exact path="/" component={Home} /> */}
					<Route exact path="/signUp" component={SignUp} />
					<Route exact path="/login" component={Login} />
					<Route component={NotFound} />
				</Switch>
			</AuthProvider>
		</Router>
	);
};

export default App;
