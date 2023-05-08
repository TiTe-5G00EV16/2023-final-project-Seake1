import { useState } from "react";
import { Form, Button, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { registerUser } from "../services/userData";
import SimpleSider from "../components/Siders/SimpleSider";
import "../components/Register/Register.css";

function Register({ history }) {
  const [loading, setLoading] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    name: null,
    lastName: null,
    gender: null,
    phoneNumber: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChanges = (e) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmitReg = (e) => {
    e.preventDefault();
    setLoading(true);
    registerUser(userData)
      .then((res) => {
        if (!res.error) {
          history.push("/auth/login");
        } else {
          setLoading(false);
          setError(res.error);
          setAlertShow(true);
        }
      })
      .catch((err) => console.error("error from register: ", err));
  };

  return (
    <>
      <SimpleSider />
      <div className="container auth-form">
        <h1 className="auth-heading">Sign Up</h1>
        <Form className="col-lg-8" onSubmit={handleSubmitReg}>
          {alertShow && (
            <Alert
              variant="danger"
              onClose={() => setAlertShow(false)}
              dismissible
            >
              <p>{error}</p>
            </Alert>
          )}
          <Form.Row>
            <Form.Group controlId="forName" className="col-lg-8">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Matti Meikäläinen"
                onChange={handleChanges}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className="col-lg-12">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="+3584432456"
                onChange={handleChanges}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="formBasicEmail" className="col-lg-12">
              <Form.Label>Email address *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="matti.meikäläinen@gmail.com"
                onChange={handleChanges}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="formBasicPassword" className="col-lg-6">
              <Form.Label>Password *</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChanges}
                required
              />
            </Form.Group>
            <Form.Group className="col-lg-6">
              <Form.Label>Repeat Password *</Form.Label>
              <Form.Control
                type="password"
                name="repeatPassword"
                placeholder="Repeat password"
                onChange={handleChanges}
                required
              />
            </Form.Group>
          </Form.Row>
          {loading ? (
            <Button variant="primary " disabled>
              wait... <Spinner animation="border" />
            </Button>
          ) : (
            <Button
              variant="primary"
              className="col align-self-center"
              type="submit"
            >
              Sign Up
            </Button>
          )}

          <p className="bottom-msg-paragraph">
            Already have an account? <Link to="/auth/login">Sign In</Link>!
          </p>
        </Form>
      </div>
    </>
  );
}

export default Register;
