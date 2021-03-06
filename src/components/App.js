//React Imports
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";

//Bootstrap Imports
import { Container } from "react-bootstrap";

//React Components
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/profile/:deviceId" exact component={Profile} />
            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="w-200" style={{ maxWidth: "400px" }}>
                <Route path="/signup" exact component={SignUp} />
                <Route path="/login" exact component={Login} />

                <Route
                  path="/forgot-password"
                  exact
                  component={ForgotPassword}
                />
              </div>
            </Container>
          </Switch>
        </AuthProvider>
      </Router>
    </React.Fragment>
  );
};

export default App;
