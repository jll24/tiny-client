import React from 'react';
import {Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../pages/Profile/Profile.css'

const PageNotFound = () => {
    const ErrorImage = "https://res.cloudinary.com/jllacson/image/upload/v1640040746/Error-404_dmbsby.jpg"
    return (
        <div>
            <Container className="text-center">
                <Row>
                    <img 
                        src={ErrorImage} 
                        alt="Page Not Found" 
                        className="mt-1 not-found"
                        />
                    <Link to="/" style={{color:"#ff5f4a"}}><h6>Go Home</h6></Link>
                </Row>
            </Container>
           
        </div>
    );
};

export default PageNotFound;