import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Container, Row, Col, Button, Offcanvas, tr, td} from "react-bootstrap";

const MainProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useParams();
  const settings = useSelector((state) => state.settings);
  const viewedUser = useSelector((state) => state.viewedUser);
  const viewedUserStories = useSelector((state) => state.viewedUserStories);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const follows = useSelector((state) => state.follows);
  const [loadUserStories, setLoadUserStories] = useState(true);
  const [loading, setLoading] = useState(false);
  const ClapIcon =
    "https://res.cloudinary.com/jllacson/image/upload/v1639918038/vqmyp5ebajk7mjdh91dt.png";
  const [showFollower, setShowFollower] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const handleCloseFollower = () => setShowFollower(false);
  const handleShowFollower = () => setShowFollower(true);
  const handleCloseFollowing = () => setShowFollowing(false);
  const handleShowFollowing = () => setShowFollowing(true);

  useEffect(() => {
    //Load Viewed User's data to get _id
    axios.get(`${settings.API_URL}/profile/${username}`).then((res) => {
      setLoading(true);
      dispatch({ type: "LOAD_VIEWED_USER", payload: res.data.data });
      //Load Followers and Following
      axios
        .get(`${settings.API_URL}/${username}/follow`)
        .then((res5) => {
          dispatch({type: "LOAD_VIEWED_USER_FOLLOWS", payload: res5.data.data})
        })
      //Load Updated loggedInUser
      axios
        .get(`${settings.API_URL}/profile/${loggedInUser.username}`)
        .then((result) => {
          dispatch({
            type: "LOAD_UPDATED_LOGGEDINUSER",
            payload: result.data.data,
          });
          //Load Viewed User's stories
          axios
            .get(`${settings.API_URL}/stories/byuser/${res.data.data._id}`)
            .then((res2) => {
              setLoadUserStories(true);
              dispatch({
                type: "LOAD_VIEWED_USER_STORIES",
                payload: res2.data.data,
              });
            });
        });
    });
  }, [dispatch, username]);

  const onClapHandler = (storyId) => {
    setLoading(true);
    //Add 1 clap to story on every button click
    axios.post(`${settings.API_URL}/stories/${storyId}/claps`).then((res1) => {
      //Reload viewedUser data
      axios.get(`${settings.API_URL}/profile/${username}`).then((res) => {
        dispatch({ type: "LOAD_VIEWED_USER", payload: res.data.data });
        //Reoad viewedUserStories data
        axios
          .get(`${settings.API_URL}/stories/byuser/${res.data.data._id}`)
          .then((res2) => {
            setLoadUserStories(true);
            dispatch({
              type: "LOAD_VIEWED_USER_STORIES",
              payload: res2.data.data,
            });
          });
      });
    });
  };

  const onFollow = () => {
    setLoading(true);
    //Follow another user.
    axios
      .put(`${settings.API_URL}/follow/${loggedInUser?._id}/${viewedUser?._id}`)
      .then((res3) => {
        setLoading(false);

        //Reload viewedUser data
        axios.get(`${settings.API_URL}/profile/${username}`).then((res) => {
          dispatch({ type: "LOAD_VIEWED_USER", payload: res.data.data });

          //Reload Followers and Following
            axios
            .get(`${settings.API_URL}/${username}/follow`)
            .then((res5) => {
              dispatch({type: "LOAD_VIEWED_USER_FOLLOWS", payload: res5.data.data})
            })

          //Reload loggedInUser data
          axios
            .get(`${settings.API_URL}/profile/${loggedInUser.username}`)
            .then((res4) => {
              dispatch({
                type: "LOAD_UPDATED_LOGGEDINUSER",
                payload: res4.data.data,
              });
            });
        });
      });
  };

  const onUnfollow = () => {
    setLoading(true);
    //Follow another user
    axios
      .put(
        `http://projecttiny.ap-1.evennode.com/unfollow/${loggedInUser?._id}/${viewedUser?._id}`
      )
      .then((res3) => {
        //Reload viewedUser data
        axios.get(`${settings.API_URL}/profile/${username}`).then((res) => {
          dispatch({ type: "LOAD_VIEWED_USER", payload: res.data.data });
          
          //Reload Followers and Following
          axios
          .get(`${settings.API_URL}/${username}/follow`)
          .then((res5) => {
            dispatch({type: "LOAD_VIEWED_USER_FOLLOWS", payload: res5.data.data})
          })

          //Reload loggedInUser data
          axios
            .get(`${settings.API_URL}/profile/${loggedInUser.username}`)
            .then((res4) => {
              dispatch({
                type: "LOAD_UPDATED_LOGGEDINUSER",
                payload: res4.data.data,
              });
            });
        });
      });
  };

  useEffect(() => {
    if (Object.keys(loggedInUser).length === 0) {
      //if object is empty
      navigate("/login"); //navigate to login
    } else {
      return;
    }
  }, []);

  return (
    <div>
      <Container className="container-fluid">
        <Row>
          <Col className="col-md-3">
            <div
              className="profile"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={viewedUser?.photo}
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                }}
                className="image-fluid mb-3"
                alt=""
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h4>
                  {viewedUser?.firstname} {viewedUser?.lastname}
                </h4>
                <pre className="aboutme">
                  <p>{viewedUser?.aboutme}</p>
                </pre>
                
                <div style={{ display: "flex" }}>
                  <p
                    onClick={handleShowFollower}
                    style={{
                      color: "#1e3945",
                      fontSize: "30px",
                      lineHeight: "10px",
                      marginTop: "20px",
                      marginRight: "60px",
                      cursor: "pointer"
                    }}
                  >
                    {follows?.followers?.length}
                  </p>

                  {/* OFFCANVAS FOR FOLLOWER */}    
                <Offcanvas show={showFollower} onHide={handleCloseFollower}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>{viewedUser?.firstname}'s followers:</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  {
                    follows?.followers?.map(follower => {
                      return(
                        <div style={{display: "block", marginBottom:"10px"}}>
                          <Link to={`../profile/${follower.username}`} 
                                style={{textDecoration:"none", color:"black"}}>
                           <img
                              src={follower.photo}
                              alt="profile"
                              className="profile-pic"
                              style={{
                                marginRight: "10px",
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%"
                              }}
                            />
                            <span>
                              {follower.firstname} {follower.lastname}
                            </span>
                          </Link>
                        </div>
                      )
                    })
                  }
                </Offcanvas.Body>
              </Offcanvas>

                  <p
                    onClick={handleShowFollowing}
                    style={{
                      color: "#1e3945",
                      fontSize: "30px",
                      lineHeight: "10px",
                      marginTop: "20px",
                      marginLeft: "65px",
                      cursor: "pointer"
                    }}
                  >
                    {follows?.following?.length}
                  </p>
                </div>

                {/* OFFCANVAS FOR FOLLOWING */}    
                <Offcanvas show={showFollowing} onHide={handleCloseFollowing}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>{viewedUser?.firstname} is following:</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  {
                    follows?.following?.map(following => {
                      return(
                        <div style={{display: "block", marginBottom:"10px"}}>
                          <Link to={`../profile/${following.username}`} 
                                style={{textDecoration:"none", color:"black"}}>
                           <img
                              src={following.photo}
                              alt="profile"
                              className="profile-pic"
                              style={{
                                marginRight: "10px",
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%"
                              }}
                            />
                            <span>
                              {following.firstname} {following.lastname}
                            </span>
                          </Link>
                        </div>
                      )
                    })
                  }
                </Offcanvas.Body>
              </Offcanvas>

                <div style={{ display: "flex" }}>
                  <p style={{ lineHeight: "10px", marginRight: "40px" }}>
                    <small>
                      {viewedUser?.followers?.length > 1
                        ? "Followers"
                        : "Follower"}
                    </small>
                  </p>
                  <p style={{ lineHeight: "10px", marginLeft: "40px" }}>
                    <small>Following</small>
                  </p>
                </div>
                {loggedInUser?._id ===
                viewedUser?._id ? null : loggedInUser?.following?.includes(
                    viewedUser?._id
                  ) ? (
                  <>
                    <Button
                      onClick={() => onUnfollow(viewedUser?._id)}
                      style={{
                        backgroundColor: "white",
                        border: "1px solid #ff5f4a",
                        borderRadius: "15px",
                        color: "black",
                        textAlign: "center",
                        width: "100px",
                      }}
                    >
                      Unfollow
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => onFollow(viewedUser?._id)}
                    style={{
                      backgroundColor: "#ff5f4a",
                      border: "1px solid #ff5f4a",
                      color: "white",
                      borderRadius: "15px",
                      textAlign: "center",
                      width: "100px",
                    }}
                  >
                    Follow
                  </Button>
                )}
                <hr style={{ backgroundColor: "#c7c9c7" }} />
              </div>
            </div>
          </Col>
          <Col className="col-md-9">
            <Container className="container-fluid stories-container d-flex flex-column justify-content-start">
            <Row>
              <h2
                style={{
                  textAlign: "center",
                  color: "#1e3945",
                  lineHeight: "50px",
                }}
              >
                STORIES
              </h2>
              <hr style={{ backgroundColor: "#ff5f4a " }} />
            </Row>
              {loadUserStories && viewedUserStories?.length === 0
                ? loggedInUser?._id === viewedUser?._id
                  ? "You have no stories yet."
                  : `${viewedUser?.firstname} has no stories yet.`
                : viewedUserStories?.map((story) => {
                    return (
                      <React.Fragment>
                        <Row className="mt-4">
                          <h1
                            dangerouslySetInnerHTML={{
                              __html: story.title,
                            }}
                          />
                          <small style={{ color: "gray", marginBottom:"10px" }}>
                            <em>
                              {moment(story.createdAt).format("LL")}
                            </em>
                          </small>
                        </Row>
                        <Row>
                          <img
                            className="image-fluid mt-3 mb-3"
                            src={story.photo}
                            alt=""
                          />
                        </Row>
                        <Row className="mb-4">
                          <pre
                            style={{
                              whiteSpace: "pre-wrap",
                              fontFamily: "var(--bs-body-font-family)",
                              fontSize: "font-size: var(--bs-body-font-size)",
                            }}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: story.content,
                              }}
                            />
                          </pre>
                        </Row>
                        <Row>
                          <span>
                            {story.claps !== 0 ? story.claps : null}
                            {/* Disable clap button when on loggedInUser's profile page */}
                            {loggedInUser?._id === story.user._id ? (
                              <img
                                src={ClapIcon}
                                alt="Clap Icon"
                                className="disable-clap"
                                style={{
                                  width: "25px",
                                  marginLeft: "5px",
                                }}
                              />
                            ) : (
                              <img
                                src={ClapIcon}
                                alt="Clap Icon"
                                className="clap"
                                style={{
                                  width: "25px",
                                  cursor: "pointer",
                                  marginLeft: "5px",
                                }}
                                onClick={() => onClapHandler(story._id)}
                              />
                            )}
                          </span>
                        </Row>
                        <hr />
                      </React.Fragment>
                    );
                  })}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainProfile;
