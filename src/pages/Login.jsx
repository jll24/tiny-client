import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { useSelector, useDispatch } from "react-redux";

//components

import Footer from "../components/Footer";

const Login = () => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings)
  const loggedInUser = useSelector(state => state.loggedInUser);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const hideNotification = () => {
    setError("");
    setSuccess("");
  };

  const triggerChange = e => {
    e.preventDefault();
    hideNotification();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const triggerSubmit = async e => {
    e.preventDefault();
    hideNotification();    

    if (email && password) {
      setLoading(true);
      await axios
        .post(`${settings.API_URL}/login`, form)
        .then(res => {
          if (res.data.message) {
            setSuccess(res.data.message);
            dispatch({ type: "SET_LOGGED_IN_USER", payload: res.data.user }); //save to redux
            
            //check storyURL in local storage if exist then navigate to the story link
            const storyURL = localStorage.getItem("storyURL");

            if (storyURL) {
              //remove the storyURL in local storage
              localStorage.removeItem("storyURL");
              navigate(storyURL);
            } else { //if no story URL set then
              
              //check if user has a following then goto newsfeed else goto suggested page
              if (res.data?.user?.following?.length > 0) {
                navigate("/newsfeed"); 
              } else {
                navigate("/suggested");  
              }  
            }
            
          } else {
            setLoading(false);
            setError(res.data.error);
          }          
        })
        .catch(e => {
          setLoading(false);
          setError(e?.message);
        });      
      
    } else {
      setError("All fields are required!");      
    }
  };

  const googleAuth = async ({ profileObj }) => {
    //i followed this tutorial and tweak it to work with our app
    //https://www.youtube.com/watch?v=gV5ONnqtM8Q
    setLoading(true);

    const googleData = {
      email: profileObj.email,
      googleId: profileObj.googleId,
    };

    await axios
      .post(`${settings.API_URL}/login-gmail`, googleData)
      .then(res => {
        if (res.data.message) {
          setSuccess(res.data.message);
          dispatch({ type: "SET_LOGGED_IN_USER", payload: res.data.user }); //save to redux
          
          //check storyURL in local storage if exist then navigate to the story link
          const storyURL = localStorage.getItem("storyURL");

          if (storyURL) {
            //remove the storyURL in local storage
            localStorage.removeItem("storyURL");
            navigate(storyURL);
          } else { //if no story URL set then
              
            //check if user has a following then goto newsfeed else goto suggested page
            if (res.data?.user?.following?.length > 0) {
              navigate("/newsfeed"); 
            } else {
              navigate("/suggested");  
            }  
          }
                  
        } else {
          setLoading(false);
          setError(res.data.error);
        }
      })
      .catch(e => {
        setLoading(false);
        setError(e?.message);
      });
  };

  useEffect(() => {
    if (Object.keys(loggedInUser).length !== 0) {
      //if object is not empty
      navigate("/"); //navigate to home page
    }
  }, []);

  return (
    <React.Fragment>
      <div>
        <Row className="mx-auto my-5">
          <Col className="col-md-4 offset-md-4">
            <Card className="shadow">
              <Card.Body>
                <Card.Title>
                  Authentication{" "}
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
                        <Row>
                          <Col className="px-5 mt-3 text-center">
                            <GoogleLogin
                              clientId="755017754916-fhfflabhjps9p45cug7keuf3d87hconi.apps.googleusercontent.com"
                              onSuccess={googleAuth}
                              onFailure={googleAuth}
                              cookiePolicy={"single_host_origin"}>
                              <span>Login via Google</span>
                            </GoogleLogin>
                          </Col>
                        </Row>

                        <Form onSubmit={triggerSubmit}>
                          <Form.Group as={Row} className="mb-3 mt-4 pt-2">
                            <Form.Label column sm="3">
                              Email
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={triggerChange}
                                autoFocus
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

                          <Row>
                            <Col className="text-end">
                              <Button
                                variant="danger"
                                type="submit"
                                className="float-end me-1">
                                Login
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
                  <Link to="/forgotpassword" className="text-decoration-none text-danger p-2">Forgot Password</Link> | 
                  <Link to="/register" className="text-decoration-none text-danger p-2">Register</Link>
                </p>
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Login;
