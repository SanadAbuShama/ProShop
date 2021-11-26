import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Row, Button, Col, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listUserOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderUserOrders = useSelector((state) => state.orderUserOrders);
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = orderUserOrders;

  const navigate = useNavigate();

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
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listUserOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, user, dispatch, success]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated!</Message>}
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <Button className="btn-sm" variant="transparent">
                      <Link
                        to={`/orders/${order._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        Details
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
