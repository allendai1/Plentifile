import '../App.css';
import '../App.scss';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import {Form,Button,Navbar,Image} from 'react-bootstrap';
import {Link,useHistory} from 'react-router-dom'
import {React, useState} from 'react'
import Login from './Login'
import { AuthProvider, useAuth } from "../contexts/AuthContext"
import Signup from './Signup'


function NavigationBar() {
  const history = useHistory()
  const [loggedInState, setLoggedInState] = useState(false)
  const currentUser= useAuth().currentUser
  console.log(currentUser)
    return (
      <Navbar variant="light" bg="navbarcolor">
        <div>Logged in as {JSON.stringify(currentUser)}:</div>
            <Button variant="primary" className="signup" onClick={()=>history.push("/signup")}>Sign Up</Button>
            
            <Button variant="primary" className="login" onClick={()=>history.push("/login")}>Login</Button>
            
              
            
            
            
          
          
          
          <Form>
            <Form.Group controlId="formSearchBar">
              <Form.Control className="searchbar"type="search" placeholder="Search"></Form.Control>
            </Form.Group>
          </Form>
      </Navbar>
    )
  };
export default NavigationBar