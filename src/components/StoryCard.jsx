import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Container, Col, Row } from "react-bootstrap";

const StoryCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings);
  const stories = useSelector(state => state.stories);
  const loggedInUser = useSelector(state => state.loggedInUser);

  useEffect(() => {
    if (Object.keys(loggedInUser).length === 0) {
      //check if not logged in

      navigate("/login"); //navigate to login page
    } else {
      //Load Updated loggedInUser data
      axios.get(`${settings.API_URL}/users/${loggedInUser._id}`).then(res2 => {
        dispatch({
          type: "LOAD_UPDATED_LOGGEDINUSER",
          payload: res2.data.data,
        });
        //Load Stories followed by loggedInUser
        axios
          .get(`${settings.API_URL}/stories?${settings.bypassLANCache}`)
          .then(res => {
            dispatch({ type: "LOAD_STORIES", payload: res.data.data });
          });
      });
    }
  }, []);

  return (
    <div>
      <Container>
        <Row className="mt-3">
          <Col className="col ">
            <Row className="d-flex justify-content-center align-items-">
              {stories &&
                stories
                  .filter(
                    story =>
                      loggedInUser.following.includes(story.user._id) ||
                      story.user._id === loggedInUser._id
                  )
                  .map(story => {
                    return (
                      <Card sx={{ maxWidth: 290, margin: "20px" }}>
                        <CardActionArea>
                          <Link
                            to={`/stories/${story._id}`}
                            style={{
                              textDecoration: "none",
                            }}>
                            <CardMedia
                              component="img"
                              height="140"
                              image={story.photo}
                              alt="story photo"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div">
                                <h2
                                  dangerouslySetInnerHTML={{
                                    __html: story.title,
                                  }}
                                  style={{
                                    color: "#1e3945",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    overflow: "hidden",
                                    textTransform: "capitalize",
                                    height: "45px",
                                  }}
                                />
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: story.content,
                                  }}
                                  style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                  }}
                                />
                              </Typography>
                            </CardContent>
                          </Link>
                        </CardActionArea>
                        <CardActions>
                          <Link
                            to={`/profile/${story.user.username}`}
                            style={{ textDecoration: "none" }}>
                            <div
                              className="profile-name"
                              style={{ display: "flex", alignItems: "center" }}>
                              <img
                                src={story.user.photo}
                                alt="profile"
                                className="profile-pic"
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  borderRadius: "50%",
                                  position: "relative",
                                  zIndex: "1",
                                }}
                              />
                              <span
                                style={{
                                  position: "relative",
                                  border: "1px solid #ff5f4a",
                                  color: "#ff5f4a",
                                  padding: "2px 15px 2px 25px",
                                  left: "-15px",
                                  borderRadius: "0 20px 20px 0",
                                }}>
                                {story.user.firstname} {story.user.lastname}
                              </span>
                            </div>
                          </Link>
                        </CardActions>
                      </Card>
                    );
                  })}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StoryCard;
