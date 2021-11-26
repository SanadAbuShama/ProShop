import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Row, Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const { loading, error } = userRegister;

  const navigate = useNavigate();

  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const nameChangeHandler = (event) => {
    const enteredName = event.target.value;

    setName(enteredName);
  };

  const emailChangeHandler = (event) => {
    const enteredEmail = event.target.value;

    setEmail(enteredEmail);
  };
  const passwordChangeHandler = (event) => {
    const enteredPassword = event.target.value;

    setPassword(enteredPassword);
  };
  const confirmPasswordChangeHandler = (event) => {
    const enteredConfirmPassword = event.target.value;

    setConfirmPassword(enteredConfirmPassword);
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (event) => {
    event.preventDefault();

    //Dispatch REGISTER
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      setMessage(null);
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={nameChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={emailChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={passwordChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-3" controlId="confirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="my-3" variant="primary">
          Register
        </Button>
      </Form>
      <Row>
        <Col>
          Have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
