import React from 'react'
import '../App.css';
import '../App.scss';
import Signup from './Signup'
import NavigationBar from './NavigationBar'
import {Container} from 'react-bootstrap'
import { AuthProvider, useAuth } from "../contexts/AuthContext"
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import LandingPage from './HomePage'
import Layout1 from './Layout1'
function App() {
  return (
    
    <div className="App">
      
      
      <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
        </AuthProvider>
      </Router>
      
    
      </div>
      
    
  );
}
function Test() {
  return (
    <h1>Test</h1>
  )
}




export {App,Test};
