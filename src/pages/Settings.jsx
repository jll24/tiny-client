import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  Row,
  Button,
  Container,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const navigate = useNavigate("");
  //const [photo, setPhoto] = useState('');
  const [aboutme, setAboutMe] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const hideNotification = () => {
    setError("");
    setSuccess("");
  };

  // Update Profile Photo
  const updatePhoto = (image_url) => {
    let newPhoto = { photo: image_url };

    setLoading(true);

    axios
      .patch(`${settings.API_URL}/users/${loggedInUser?._id}/photo`, newPhoto)
      .then(() => {
        setLoading(false);
        const updateLoggedInUserPhoto = { ...loggedInUser, photo: image_url };
        dispatch({
          type: "SET_LOGGED_IN_USER",
          payload: updateLoggedInUserPhoto,
        });
        setSuccess("Profile photo updated.");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  const triggerUpdatePhoto = async (e) => {
    e.preventDefault();

    setLoading(true);

    let formData = new FormData();

    formData.append("file", file);

    axios
      .post(`${settings.API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        updatePhoto(response.data.data.image_url);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  //Update About Me
  const updateAboutMe = (e) => {
    e.preventDefault();

    let newAboutMe = { aboutme: aboutme };

    setLoading(true);

    axios
      .patch(
        `${settings.API_URL}/users/${loggedInUser?._id}/aboutme`,
        newAboutMe
      )
      .then(() => {
        setLoading(false);
        const updateLoggedInUserAbout = { ...loggedInUser, aboutme: aboutme };
        dispatch({
          type: "SET_LOGGED_IN_USER",
          payload: updateLoggedInUserAbout,
        });
        setSuccess("About Me updated.");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  useEffect(() => {
    if (Object.keys(loggedInUser).length === 0) {
      //if object is empty
      navigate("/login"); //navigate to login
    } else {
      hideNotification();
    }
  }, []);

  return (
    <div>
      <Container>
        {loading ? (
          <div className="text-center my-5">
            <div>Processing... Please wait!</div>
            <Spinner animation="border" variant="danger" className="mt-3" />
          </div>
        ) : (
          <div>
            <Row className="mt-2 text-center">
              <Col>
                {error ? <Alert variant="danger">{error}</Alert> : null}
              </Col>
            </Row>
            <Row className="mt-2 text-center">
              <Col>
                {success ? <Alert variant="success">{success}</Alert> : null}
              </Col>
            </Row>

            <Row>
              <Col className="col-md-3">
                <button
                  onClick={() => navigate(`/profile/${loggedInUser.username}`)}
                  style={{
                    transform: "rotate(180deg)",
                    fontSize: "40px",
                    padding: "0",
                    background: "none",
                    border: "none",
                    color: "#ff5f4a",
                  }}
                >
                  ➜
                </button>
                <h2 style={{ fontSize: "40px" }}>Settings</h2>
              </Col>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  alignItems: "center",
                }}
              >
                <Form
                  className="mt-5"
                  onSubmit={triggerUpdatePhoto}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Form.Group
                    controlId="formFile"
                    className="mt-3 mb-3"
                    style={{
                      textAlign: "center",
                      width: "95%",
                    }}
                  >
                    <Form.Label>
                      Profile Photo{" "}
                      <span style={{ color: "lightgray" }}>
                        (.jpg, .jpeg, .png)
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      name="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{
                        width: "100%",
                        display: "block",
                      }}
                    ></Form.Control>
                    <Button
                      type="submit"
                      style={{
                        textAlign: "center",
                        width: "100%",
                        marginTop: "10px",
                        backgroundColor: "#ff5f4a",
                        borderColor: "#ff5f4a",
                        color: "white",
                      }}
                    >
                      Save Profile Photo
                    </Button>
                  </Form.Group>
                </Form>
                <Form
                  className="mt-5"
                  onSubmit={updateAboutMe}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Form.Label>
                    About Me{" "}
                    <span style={{ color: "lightgray" }}>(150 characters)</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    value={aboutme}
                    style={{
                      width: "100%",
                      height: "20vh",
                      resize: "none",
                    }}
                    onChange={(e) => setAboutMe(e.target.value)}
                  ></Form.Control>
                  <Button
                    type="submit"
                    style={{
                      width: "300px",
                      margin: "10px 0",
                      backgroundColor: "#ff5f4a",
                      borderColor: "#ff5f4a",
                      color: "white",
                    }}
                  >
                    Save
                  </Button>
                </Form>
              </div>
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Settings;
