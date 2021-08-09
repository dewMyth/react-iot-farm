//React Imports
import React, {useRef, useState} from "react";
import {useAuth} from '../contexts/AuthContext'; 
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

//Bootstrap Imports
import { Form, Button, Card, Alert } from "react-bootstrap";



const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    async function handleLogin(e){
        e.preventDefault();
        try {
          setError('');
          setLoading(true);
          await login(emailRef.current.value, passwordRef.current.value);
          history.push("/")
        }
        catch {
          setError("Failed to sign in!")
        }
    
        setLoading(false)
      }

      return (
        <div>
          <Card style={{width : "350px"}}>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group className="mt-4" id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef}></Form.Control>
                </Form.Group>
                <Form.Group className="mt-4" id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef}></Form.Control>
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-4" type="submit">Login</Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-4" >
            Forogot Password?
          </div> 
          <div className="w-100 text-center mt-4" >
            Need an account? <Link to="/signup">Sign Up</Link>
          </div> 
        </div>
      );
}

export default Login
