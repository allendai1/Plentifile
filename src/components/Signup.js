import {Form,Button,Card, Alert,Container} from 'react-bootstrap'
import {useRef, useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import { AuthProvider, useAuth } from "../contexts/AuthContext"
import Login from './Login'

export default function Signup() {
    const emailRef= useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup,currentUser} = useAuth() 
    const [error, setError] = useState('')
    const [loading,setLoading] = useState(false)
    const history = useHistory()
    // if logged in, redirect to dashboard
    useEffect(()=>{
        if(currentUser){
            history.push('/')
    }
 
    })
    async function handleSubmit(e){
        e.preventDefault()  
        
        if (passwordRef.current.value != passwordConfirmRef.current.value){
            return setError("Passwords do not match")
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        }
        catch {
            setError("Failed to create an acconut")
            setLoading(false)
        }
    }
    return (
        <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
    <div className="w-100" style={{ maxWidth: "400px" }}>
     <Card>
            <Card.Body >
                <h2 className="text-center mb-1">Sign Up</h2>
                
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                    </Form.Group>
                    <Button disabled={loading}type='submit' className="w-100">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
        </div> 
        </div>

   
        
    </Container>
    )
}





    