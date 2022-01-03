import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import Main from "../components/Main";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Navigation from "../components/Navigation";

const Home = () => {
  const loggedInUser = useSelector(state => state.loggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(loggedInUser).length !== 0) {
      //if object is not empty
      navigate("/newsfeed"); //navigate to newsfeed page
    }
  }, []);

  return (
    <div>
      <Navigation />
      <Banner />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
