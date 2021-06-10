import {Form,Button, Alert,Container} from 'react-bootstrap'
import {useRef, useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"
import {database} from '../firebase'
export default function Signup(props) {
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
        
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match")
        }
        try {
            setError('')
            setLoading(true)
            
            const userObj = await signup(emailRef.current.value, passwordRef.current.value)
            database.users.doc(userObj.user.uid).set({
                linksCreated : 0,
                totalFileSize : 0,
                lastUploaded : ""
            })
            

            history.push('/home')
            
        }
        catch {
            setError("Failed to create an acconut")
            setLoading(false)
        }
    }
    return (
        <Container style={{padding: "1.25rem 1.25rem"}}
      >
    <div className="w-100" >
     
                <h2 >Sign Up</h2>
                
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
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                    </Form.Group>
                    <Button disabled={loading}type='submit' className="w-100">Sign Up</Button>
                </Form>
         
        <div className="w-100 text-center mt-2">
            Have an account? <button style={{border:"0"}}onClick={()=>props.login(true)}>Log in</button>
        </div> 
        </div>

   
        
    </Container>
    )
}





    