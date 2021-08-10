import React, {useRef, useState} from "react";
import {useAuth} from '../contexts/AuthContext'; 
import { Link } from "react-router-dom";

//Bootstrap Imports
import { Form, Button, Card, Alert } from "react-bootstrap";


const ForgotPassword = () => {

    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleForgotPassword(e){
        e.preventDefault();
        try {
          setError('');
          setLoading(true);
          await resetPassword(emailRef.current.value);
          setMessage("Check Your email inbox to reset password link!")
        }
        catch {
          setError("Failed to reset password")
        }
    
        setLoading(false)
      }

    return (
        <React.Fragment>
          <Card style={{width : "350px"}}>
            <Card.Body>
              <h2 className="text-center mb-4">Forgot Password</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleForgotPassword}>
                <Form.Group className="mt-4" id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef}></Form.Control>
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-4" type="submit">Reset Password</Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-4" >
          <Link to="/login">Back to login</Link>
          </div> 
        </React.Fragment>
    )
}

export default ForgotPassword
