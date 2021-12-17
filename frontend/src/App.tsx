// import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./AuthContext";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";

const App: React.FC = () => {
	return (
		<Router>
			<Switch>
				<AuthProvider>
					<Route exact path="/" component={Home} />
					{/* <Route exact path="/" component={Home} /> */}
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/login" component={Login} />
				</AuthProvider>
			</Switch>
		</Router>
	);
};

export default App;
