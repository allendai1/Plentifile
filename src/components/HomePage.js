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
import Layout1 from './Layout1'
export default function HomePage() {
    

    return (
        <>
        <NavigationBar/>
            
        
          
                
            
            
        </>
        
    )
}