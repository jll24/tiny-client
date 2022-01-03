import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignedNav from "../../components/SignedNav";
import MainProfile from "../../components/MainProfile";
import Footer from "../../components/Footer";
import NotFoundValue from "../../components/NotFoundValue";
import axios from "axios";
import "./Profile.css";
import PageNotFound from "../PageNotFound";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const settings = useSelector((state) => state.settings);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (Object.keys(loggedInUser).length === 0) {
      //if object is empty
      navigate("/login"); //navigate to login
    } else {
      //this check the username if exist
      axios
        .get(`${settings.API_URL}/profile/${username}`)
        .then(() => {})
        .catch(() => {
          setNotFound(true);
        });
    }
  }, []);

  return (
    <div>
      <SignedNav />
      {notFound ? <PageNotFound /> : <MainProfile />}
    </div>
  );
};

export default Profile;
