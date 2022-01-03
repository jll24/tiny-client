import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundValue = () => {
    
    return (
        <>           
            <div className="text-center py-5">
                <h1>404 - Not Found!</h1>
                <Link to="/">Go Home</Link>
            </div>
        </>
    )
}

export default NotFoundValue
