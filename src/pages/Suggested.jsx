import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import SignedNav from "../components/SignedNav";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import ProfileCard from "../components/ProfileCard";
import "./Suggested.css";

const Suggested = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const users = useSelector((state) => state.users);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const [recentFollowed, setRecentFollowed] = useState([]);
  const [loading, setLoading] = useState(false);

  function shuffleUsers(uArray) {
    let i = uArray.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = uArray[i];
      uArray[i] = uArray[j];
      uArray[j] = temp;
    }
    return uArray;
  }
  const shuffledUsers = shuffleUsers(users);

  const updateLoggedInUser = (type, user) => {
    let currentFollowing = loggedInUser.following;
    let following = [];

    if (type.toLowerCase() === "follow") {
      currentFollowing.push(user._id);
      following = [...currentFollowing];

      setRecentFollowed([...recentFollowed, user]);
    } else {
      //sa redux to
      following = currentFollowing.filter((value) => {
        return value !== user._id;
      });

      //eto sa state
      let unfollowing = recentFollowed.filter((value) => {
        return value._id !== user._id;
      });

      setRecentFollowed(unfollowing);
    }

    const setLoggedInUser = { ...loggedInUser, following: following };
    dispatch({ type: "SET_LOGGED_IN_USER", payload: setLoggedInUser });
  };

  const triggerFollowBtn = (e, loggedInUser, randomUser) => {
    e.preventDefault();

    if (!loggedInUser.following.includes(randomUser._id)) {
      axios
        .put(`${settings.API_URL}/follow/${loggedInUser._id}/${randomUser._id}`)
        .then((res) => {
          updateLoggedInUser("follow", randomUser);
        });
      alert(`You have followed ${randomUser.firstname}.`);
    }
  };

  const triggerUnFollowBtn = (e, loggedInUser, randomUser) => {
    e.preventDefault();

    if (loggedInUser.following.includes(randomUser._id)) {
      axios
        .put(
          `${settings.API_URL}/unfollow/${loggedInUser._id}/${randomUser._id}`
        )
        .then((res) => {
          updateLoggedInUser("unfollow", randomUser);
        });
      alert(`You have unfollowed ${randomUser.firstname}!`);
    }
  };
  useEffect(() => {
    if (Object.keys(loggedInUser).length === 0) {
      //if object is empty
      navigate("/login"); //navigate to login
    } else {
      axios
        .get(`${settings.API_URL}/users?${settings.bypassLANCache}`)
        .then((res) => {
          setLoading(true);
          dispatch({ type: "LOAD_USERS", payload: res.data.data });
        });
    }
  }, []);
  return (
    <div>
      <SignedNav />
      <Container>
        <Row
          className="d-flex justify-content-center align-items-"
          style={{ marginTop: "15px", fontSize: "1.7rem" }}
        >
          Who To Follow
        </Row>
        <Row className="mt-3">
          <Col className="col ">
            <Row className="">
              {shuffledUsers
                //.filter((randomUser) => !loggedInUser.following.includes(randomUser._id) && loggedInUser._id !== randomUser._id)
                .filter((randomUser) => loggedInUser._id !== randomUser._id)
                .slice(0, 10)
                .map((randomUser) => {
                  return (
                    <ProfileCard
                      key={randomUser._id}
                      user={randomUser}
                      loggedInUser={loggedInUser}
                      triggerFollowBtn={triggerFollowBtn}
                      triggerUnFollowBtn={triggerUnFollowBtn}
                    />
                  );
                })}
            </Row>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default Suggested;
