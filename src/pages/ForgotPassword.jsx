import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Footer from "../components/Footer";

const ForgotPassword = () => {
  const settings = useSelector(state => state.settings)
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const hideNotification = () => {
    setError("");
    setSuccess("");
  };

  const triggerChange = (e) => {
    e.preventDefault();
    hideNotification();
    setEmail(e.target.value);
  };

  const triggerSubmit = (e) => {
    e.preventDefault();
    hideNotification();    

    let frontEndOrigin = window.location.origin.toString();

    if (email) {
      setLoading(true);
      axios
        .post(`${settings.API_URL}/forgotpassword`, {
          email,
          frontEndOrigin,
        })
        .then((res) => {
          if (res.data.message) {
            setSuccess(res.data.message);
          } else {
            setError(res.data.error);
          } 

          setLoading(false);         
          
        })
        .catch((e) => { 
          setError(e?.message);
          setLoading(false);
        });
      
    } else {
      setError("All fields are required!");      
    }
  };

  return (
    <div>
      <Row className="mx-auto my-5">
        <Col className="col-md-6 offset-md-3">
          <Card className="shadow">
            <Card.Body>
              <Card.Title>
                Forgot Password{" "}
                <Link to="/" className="float-end text-decoration-none text-danger">
                  x
                </Link>
              </Card.Title>

              {
                loading ?
                  (
                    <div className="text-center my-5">
                      <div>Processing... Please wait!</div>
                      <Spinner animation="border" variant="danger" className="mt-3" />
                    </div>  
                  )
                    :                    
                  (
                    <>
                      <Form onSubmit={triggerSubmit}>
                        <Form.Group as={Row} className="mb-3 mt-4 pt-2">
                          <Form.Label column sm="3">
                            Enter your email
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control
                              type="email"
                              name="email"
                              value={email}
                              onChange={triggerChange}
                              required
                              autoFocus
                            />
                          </Col>
                        </Form.Group>

                        <Row>
                          <Col>
                            <Button
                              variant="danger"
                              type="submit"
                              className="float-end"
                            >
                              Request Reset Password
                            </Button>
                          </Col>
                        </Row>

                        <Row className="mt-2 text-center">
                          <Col>
                            {error ? <Alert variant="danger">{error}</Alert> : null}
                          </Col>
                        </Row>
                        <Row className="mt-2 text-center">
                          <Col>
                            {success ? (
                              <Alert variant="success">{success}</Alert>
                            ) : null}
                          </Col>
                        </Row>
                      </Form>
                    </>
                  )
              }
              
            </Card.Body>
            <Card.Footer className="text-center">
              <p>
                <Link to="/login" className="text-decoration-none text-danger p-2">Login</Link> | 
                <Link to="/register" className="text-decoration-none text-danger p-2">Register</Link>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
