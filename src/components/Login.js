import React, {useRef, useState} from "react";

import { Form, Button, Card, Alert } from "react-bootstrap";

import {useAuth} from '../contexts/AuthContext'; 

import { useHistory } from "react-router";

const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
          setError('');
          setLoading(true);
          login(emailRef.current.value, passwordRef.current.value);
          history.push("/")
        }
        catch {
          setError("Failed to sign in, Make sure you are connected to internet!")
        }
    
        setLoading(false)
      }

      return (
        <div>
          <Card style={{width : "350px"}}>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
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
        </div>
      );
}

export default Login
