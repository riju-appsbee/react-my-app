import React from 'react';
import {Link} from "react-router-dom";

export default function Logout(){

        localStorage.clear();
        sessionStorage.clear();
        return(
            <div>You have successfully Logged out from this application.<Link to="/login">Click here</Link> to login again!</div>
        )
    
};