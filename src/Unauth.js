import React from 'react';
import {Link} from "react-router-dom";

export default function Unauth(){
    //Clear all storages and provide the link to log in
    localStorage.clear();
    sessionStorage.clear();
    return(<div>You are unauthorized to access this application!Please <Link to={'/login'}>click here</Link> to Login.</div>)
    
}