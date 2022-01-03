import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navigation from "../components/Navigation";
import SignedNav from "../components/SignedNav";
import Footer from "../components/Footer";

const NotFound = () => {
    const loggedInUser = useSelector(state => state.loggedInUser);

    return (
        <>
            {
                Object.keys(loggedInUser).length !== 0 ? <SignedNav /> : <Navigation />
            }
            <div className="text-center py-5">
                <h1>404 - Not Found!</h1>
                <Link to="/">Go Home</Link>
            </div>            

            <Footer />
        </>
    )
}

export default NotFound
