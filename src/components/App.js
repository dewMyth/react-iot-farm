import React from "react";
import {Container} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";

import  Dashboard from './Dashboard';
import SignUp from "./SignUp";
import Login from "./Login";



const App = () => {
  return (
    <React.Fragment>
     
      
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Container className="d-flex align-items-center justify-content-center" style={{minHeight : "100vh"}}>
              <div className="w-200" style={{maxWidth:"400px"}}>
                <Route path="/signup" exact component={SignUp} />
                <Route path="/login" exact component={Login} />
              </div>
              </Container>
            </Switch>
            

          </AuthProvider>
        </Router>

    </React.Fragment>
  );
};

export default App;