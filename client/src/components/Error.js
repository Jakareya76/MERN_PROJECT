import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
    return (
        <>
            <div className='error-page-container'>
                <h1>404 Page Not Found</h1>
                <Link to='/' className='error-page-to-go-back'>Go Back</Link>
            </div>
        </>
    )
}

export default Error;
