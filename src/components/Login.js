import {Form,Button, Alert,Container} from 'react-bootstrap'
import {useRef, useState,useEffect} from 'react'
import {useAuth} from '../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'
export default function Login(props) {
    const emailRef= useRef()
    const passwordRef = useRef()
    const {login,currentUser} = useAuth() 
    const [error, setError] = useState('')
    const [loading,setLoading] = useState(false)
    const history = useHistory()

    useEffect(()=>{
        if(currentUser){
            history.push('/')
        
    }
    })
    async function handleSubmit(e){
        e.preventDefault()  
        
        
        try {
            setError('')
            setLoading(true)
            
            await login(emailRef.current.value, passwordRef.current.value)
            console.log("Logged in")
            history.push('/home',currentUser)
        }
        catch{
            setError("Failed to log in")
            setLoading(false)
        }
    }
    return (
        
        <>
        
            <Container style={{padding: "1.25rem 1.25rem"}}>
            <div>
                   <h2>Log in</h2>
                   {error && <Alert variant='danger'>{error}</Alert>}
                   <Form onSubmit={handleSubmit}>
                       <Form.Group id="email">
                           <Form.Label>Email</Form.Label>
                           <Form.Control type="email" ref={emailRef} required></Form.Control>
   
                       </Form.Group>
                   
                       <Form.Group id="password">
                           <Form.Label>Password</Form.Label>
                           <Form.Control type="password" ref={passwordRef} required></Form.Control>
                       </Form.Group>
                       <Button variant="primary" disabled={loading} type='submit' className="w-100">Log in</Button>
                   </Form>
                   <div >
                       <Link to="/forgot-password">Forgot password?</Link>
                   </div>
               
          
   
           <div className="w-100 text-center mt-2">
               Don't have an account? <button style={{border:"0"}} onClick={()=>props.login(false)}>Sign up</button>
           </div>
           </div>
           </Container>
        
        
        
        </>
    )
}