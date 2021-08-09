import React, {useRef, useState} from "react";

import { Form, Button, Card, Alert } from "react-bootstrap";

import {useAuth} from '../contexts/AuthContext'; 

import { useHistory } from "react-router";

const SignUp = () => {

  const emailRef = useRef()
  const deviceIdRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const {signup} = useAuth()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    if(passwordRef.current.value !== confirmPasswordRef.current.value){
      return setError("Passwords should be match!!!")
    } 
    try {
      setError('');
      setLoading(true);
      signup(emailRef.current.value, passwordRef.current.value, deviceIdRef.current.value);
      history.push("/login")
    }
    catch {
      setError("Failed to create an account, Make sure you are connected to internet!")
    }

    setLoading(false)
  }

  return (
    <div>
      <Card style={{width : "350px"}}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-4" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef}></Form.Control>
            </Form.Group>
            <Form.Group className="mt-4" id="deviceId">
              <Form.Label>Device ID</Form.Label>
              <Form.Control type="text" placeholder="Ex : 1001" ref={deviceIdRef}></Form.Control>
            </Form.Group>
            <Form.Group className="mt-4" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef}></Form.Control>
            </Form.Group>
            <Form.Group className="mt-4" id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef}></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4" >
        Already have an account? Log In
      </div> 
    </div>
  );
};

export default SignUp;
