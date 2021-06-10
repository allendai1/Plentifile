import React from 'react'
import "../sass/App.scss"
import { AuthProvider,} from "../contexts/AuthContext"
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Settings from './Settings'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import LandingPage from './LandingPage'
import DefaultPage from './DefaultPage'
import MyFiles from './MyFiles'
import Footer from './Footer'
import Home from './Home'
import Contact from "./Contact"
import RestrictedUpload from './RestrictedUpload'

function App() {
  return (
    
    <div id="App" style={{position:"relative"}}>
      <div className="App" >

      
      

      <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
     
          <Route path="/forgot-password" component={ForgotPassword} />
          
          <Route path="/upload" component={RestrictedUpload} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/files" component={MyFiles}/>
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/contact" component={Contact} />
          <Route path="/" component={DefaultPage}/>
        </Switch>
        </AuthProvider>
      </Router>

      </div>
 
      
      <Footer/>

      </div>
      
    
  );
}
function Test() {
  return (
    <h1>Test</h1>
  )
}




export {App,Test};
