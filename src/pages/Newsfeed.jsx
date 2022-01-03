import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SignedNav from "../components/SignedNav";
import StoryCard from "../components/StoryCard.jsx";
const Newsfeed = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings);
  const stories = useSelector(state => state.stories);
  const loggedInUser = useSelector(state => state.loggedInUser);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState();
  const [recentFollowed, setRecentFollowed] = useState([]);

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

  function winScroll() {
    window.scrollTo(0, 0);
  }

  return (
    <>
      <SignedNav />
      <StoryCard />
    </>
  );
};

export default Newsfeed;
