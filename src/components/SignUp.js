//React Imports
import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { v4 as uuidv4 } from "uuid";

//Bootstrap Imports
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useFormControlUnstyled } from "@mui/base";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [deviceIds, setDeviceIds] = useState([{ id: uuidv4(), deviceId: "" }]);

  async function handleSignup(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords should be match!!!");
    }

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      deviceIds: deviceIds,
    };

    console.log(user);

    try {
      setError("");
      setLoading(true);
      signup(user.email, user.password, user.deviceIds);
      history.push("/login");
    } catch {
      setError(
        "Failed to create an account, Make sure you are connected to internet!"
      );
    }

    setLoading(false);
  }

  const handleChangeInput = (id, event) => {
    const newInputDevices = deviceIds.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setDeviceIds(newInputDevices);
  };

  const handleAddDevices = () => {
    setDeviceIds([...deviceIds, { id: uuidv4(), deviceId: "" }]);
  };

  const handleRemoveDevices = (id) => {
    const values = [...deviceIds];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setDeviceIds(values);
  };

  return (
    <div>
      <Card style={{ width: "350px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSignup}>
            <Form.Group className="mt-4" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef}></Form.Control>
            </Form.Group>
            <Form.Group className="mt-4" id="deviceId">
              <Form.Label>Your Farms</Form.Label>
              {deviceIds.map((deviceId) => (
                <div key={deviceId.id}>
                  <div className="row">
                    <div className="col-md-8">
                      <Form.Control
                        name="deviceId"
                        placeholder="Enter Device ID"
                        variant="filled"
                        value={deviceId.deviceId}
                        onChange={(event) =>
                          handleChangeInput(deviceId.id, event)
                        }
                      ></Form.Control>
                    </div>
                    <div className="col-md-4">
                      <div className="row">
                        <div className="col-md-2" onClick={handleAddDevices}>
                          <AddIcon />
                        </div>
                        <div
                          className="col-md-2"
                          disabled={deviceIds.length === 1}
                          onClick={() => handleRemoveDevices(deviceId.id)}
                        >
                          <RemoveIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Form.Group>
            <Form.Group className="mt-4" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef}></Form.Control>
            </Form.Group>
            <Form.Group className="mt-4" id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={confirmPasswordRef}
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        Already have an account? <Link to="/login"> Log In</Link>
      </div>
    </div>
  );
};

export default SignUp;
