import React, { useEffect, useState } from "react";
import SignedNav from "../../components/SignedNav";
import Footer from "../../components/Footer";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import "./Stories.css";
import PageNotFound from "../PageNotFound";

const Stories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { storyID } = useParams();
  const loggedInUser = useSelector(state => state.loggedInUser);
  const settings = useSelector(state => state.settings);
  const storiesByID = useSelector(state => state.storiesByID);
  const [loading, setLoading] = useState(false);
  const ClapIcon =
    "https://res.cloudinary.com/jllacson/image/upload/v1639918038/vqmyp5ebajk7mjdh91dt.png";
  //const [loadUserStories, setLoadUserStories] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const onClapHandler = storyId => {
    setLoading(true);
    //Add 1 clap to story on every button click
    axios.post(`${settings.API_URL}/stories/${storyId}/claps`).then(res1 => {
      //Reload storu data
      axios.get(`${settings.API_URL}/stories/${storyID}`).then(response => {
        dispatch({ type: "LOAD_STORY_BY_ID", payload: response.data.data });
        setLoading(true);
      });
    });
  };

  useEffect(() => {
    if (Object.keys(loggedInUser).length === 0) {
      //if user is not logged in.
      let storyURL = window.location.pathname.toString(); //get current url location
      localStorage.setItem("storyURL", storyURL); //save to local storage
      navigate("/login"); //navigate to login page
    } else {
      //if logged in, get the stories
      axios
        .get(`${settings.API_URL}/stories/${storyID}`)
        .then(response => {
          dispatch({ type: "LOAD_STORY_BY_ID", payload: response.data.data });
          setLoading(true);
        })
        .catch(() => {
          setNotFound(true);
        });
    }
  }, []);

  return (
    <React.Fragment>
      <SignedNav />
      {notFound ? (
        <>
          <PageNotFound />
        </>
      ) : (
        <>
          <Container
            className="container-fluid story mb-5 "
            style={{ marginTop: "50px" }}>
            {loading && (
              <Row className="">
                <p style={{ color: "gray" }} className="date-paragraph ">
                  {moment(storiesByID.createdAt).format("LL")}
                </p>
                <h1
                  dangerouslySetInnerHTML={{
                    __html: storiesByID.title,
                  }}
                  className="story-title"
                />
                <Row className="">
                  <Link
                    className="story-link "
                    style={{ textDecoration: "none" }}
                    to={`/profile/${storiesByID.user.username}`}>
                    <div
                      className="profile-name"
                      // style={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        src={storiesByID.user.photo}
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
                        {storiesByID.user.firstname} {storiesByID.user.lastname}
                      </span>
                    </div>
                  </Link>
                </Row>
                <Row className="story-image-row-container ">
                  <img className="" src={storiesByID.photo} />
                </Row>
                <Row className="mt-5">
                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      fontFamily: "var(--bs-body-font-family)",
                      fontSize: "font-size: var(--bs-body-font-size)",
                    }}>
                    <div
                      className="story-content"
                      dangerouslySetInnerHTML={{ __html: storiesByID.content }}
                    />
                  </pre>
                </Row>
                <Row>
                  <span className="clap-container">
                    {storiesByID.claps !== 0 ? storiesByID.claps : null}
                    {/* Disable clap button when on loggedInUser's profile page */}
                    {loggedInUser?._id === storiesByID.user._id ? (
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
                        onClick={() => onClapHandler(storiesByID._id)}
                      />
                    )}
                  </span>
                </Row>
              </Row>
            )}
          </Container>
        </>
      )}
      <Footer />
    </React.Fragment>
  );
};

export default Stories;
