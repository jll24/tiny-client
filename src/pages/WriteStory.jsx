import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Alert,
  Container,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

//components
import Footer from "../components/Footer";

const WriteStory = () => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const settings = useSelector((state) => state.settings);
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const hideNotification = () => {
    setError("");
    setSuccess("");
  };

  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submitStory = (image_url) => {
    let newStory = {
      userid: loggedInUser?._id,
      photo: image_url,
      title,
      content,
    };

    setLoading(true);

    // Second part, post to /stories
    axios
      .post(`${settings.API_URL}/stories`, newStory)
      .then(() => {
        navigate("/profile/" + loggedInUser.username);

        setTitle("");
        setContent("");
        setFile("");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  };

  const triggerSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // photo is required
    let formData = new FormData();

    /* sir jp eto yung papalitan ng 1) file.photo 2) file.path 3) file */
    formData.append("file", file);

    axios
      .post(`${settings.API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        submitStory(response.data.data.image_url);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
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
        <Row>
          <Col>
            {loading ? (
              <div className="text-center my-5">
                <div>Processing... Please wait!</div>
                <Spinner animation="border" variant="danger" className="mt-3" />
              </div>
            ) : (
              <>
                <form onSubmit={triggerSubmit} style={{ width: "90%" }}>
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

                  <Row
                    className="py-3"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Row className="sticky sticky-top">
                      <Col>
                        <button
                          onClick={() => navigate("/newsfeed")}
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
                        <Row className="mb-5">
                          <Col>
                            <h2
                              style={{
                                fontSize: "35px",
                                lineHeight: "35px",
                                marginTop: "5vh",
                              }}
                            >
                              Tell Us Something
                            </h2>
                          </Col>
                        </Row>

                        <Row
                          className="mb-4"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Col>
                            <Form.Label
                              style={{ fontWeight: "500", color: "gray" }}
                            >
                              Add Story Image
                            </Form.Label>
                          </Col>

                          <input
                            type="file"
                            name="file"
                            id="file"
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={(e) => setFile(e.target.files[0])}
                            required
                          />
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        autoFocus
                        className="mx-3 my-1"
                        style={{ backgroundColor: "#fffdeb" }}
                      />
                    </Row>

                    <Row>
                      <Form.Label>Content</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ height: "20.5vh", backgroundColor: "#fffdeb" }}
                        className="mx-3 my-1"
                        required
                      />
                    </Row>

                    <Row>
                      <Button
                        type="submit"
                        className="mx-3 mt-2"
                        style={{
                          height: "50px",
                          backgroundColor: "#ff5f4a",
                          border: "1px solid #ff5f4a",
                        }}
                      >
                        PUBLISH
                      </Button>
                    </Row>
                  </Row>
                </form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WriteStory;
