import React, { useState } from "react";
import { Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import Footer from "../components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const settings = useSelector(state => state.settings)
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  const { firstname, lastname, username, email, password, repassword } = form;

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const triggerSubmit = async (e) => {
    e.preventDefault();
    hideNotification();    

    if (firstname && lastname && username && email && password && repassword) {
      if (password === repassword) {
        setLoading(false);
        await axios
          .post(`${settings.API_URL}/register`, form)
          .then(() => {
            setSuccess("Successfully Registered!");
            navigate("/login");
          })
          .catch((e) => {
            setLoading(false);
            setError(e?.message);
          });
      } else {
        setError("Password does not match!");
      }
    } else {
      setError("All fields are required!");
    }
  };

  const googleAuth = async ({ tokenObj, profileObj }) => {
    //i followed this tutorial and tweak it to work with our app
    //https://www.youtube.com/watch?v=gV5ONnqtM8Q
    setLoading(true);

    const googleData = {
      firstname: profileObj.givenName,
      lastname: profileObj.familyName,
      username: profileObj.email.split("@")[0], //exclude email domain
      email: profileObj.email,
      password: tokenObj.login_hint,
      photo: profileObj.imageUrl,
      googleId: profileObj.googleId,
    };

    console.log({ profileObj, googleData });
    await axios.post(`${settings.API_URL}/register`, googleData).then((res) => {
      setSuccess("Successfully Registered!");
      navigate("/login");              
    })
    .catch((e) => {
      setLoading(false);
      setError(e?.message);
    });
  };

  return (
    <div>
      <Row className="mx-auto my-5">
        <Col className="col-md-6 offset-md-3">
          <Card className="shadow">
            <Card.Body>
              <Card.Title>
                Register{" "}
                <Link
                  to="/"
                  className="float-end text-decoration-none text-danger"
                  // style={{ color: "#ff5f4a" }}
                >
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
                      <Row>
                        <Col className="px-5 mt-3 text-center">
                          <GoogleLogin
                            clientId="755017754916-fhfflabhjps9p45cug7keuf3d87hconi.apps.googleusercontent.com"
                            onSuccess={googleAuth}
                            onFailure={googleAuth}
                            cookiePolicy={"single_host_origin"}
                          >
                            <span>Register via Google</span>
                          </GoogleLogin>
                        </Col>
                      </Row>

                      <Form onSubmit={triggerSubmit}>
                        <Form.Group as={Row} className="mb-3 mt-4 pt-2">
                          <Form.Label column sm="3">
                            Firstname
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control
                              type="text"
                              name="firstname"
                              value={firstname}
                              onChange={triggerChange}
                              required
                              autoFocus
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm="3">
                            Lastname
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control
                              type="text"
                              name="lastname"
                              value={lastname}
                              onChange={triggerChange}
                              required
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm="3">
                            Email
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control
                              type="email"
                              name="email"
                              value={email}
                              onChange={triggerChange}
                              required
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm="3">
                            Username
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control
                              type="string"
                              name="username"
                              value={username}
                              onChange={triggerChange}
                              required
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm="3">
                            Password
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control
                              type="password"
                              name="password"
                              value={password}
                              onChange={triggerChange}
                              required
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm="3">
                            Verify Password
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control
                              type="password"
                              name="repassword"
                              value={repassword}
                              onChange={triggerChange}
                              required
                            />
                          </Col>
                        </Form.Group>

                        <Row>
                          <Col className="text-end">
                            <Button variant="danger" type="submit">
                              Register
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
                Already have an account? <Link to="/login" className="text-decoration-none text-danger">Login</Link>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <Footer />
    </div>
  );
};

export default Register;
