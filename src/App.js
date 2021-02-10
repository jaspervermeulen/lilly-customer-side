import React from "react"
import { AuthProvider } from "./Auth/Auth";
import PrivateRoute from "./Auth/PrivateRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Reset } from 'styled-reset'

import Home from "./Home";
import Login from "./Auth/Login";
import CreateUser from "./Pages/CreateUser";
import SeeUsers from "./Pages/SeeUsers";

function App() {
  return (
    <AuthProvider>
      <Reset />
      <Router>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/createuser" component={CreateUser} />
        <PrivateRoute exact path="/seeusers" component={SeeUsers} />
        <Route exact path="/login" component={Login} />
      </Router>
    </AuthProvider>
  );
}

export default App;
