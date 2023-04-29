import React from 'react';
import {Link} from 'react-router-dom';


const HomePage=()=>{
  return(
    <div className="home container">
      <h1 className="heading">Recipes For Thought</h1>
      <h2>Recipes That Let You Explore and Think Outside The Box</h2>
      <p>All In One Place</p>
      <Link to="/signup"  className="btn btn-primary btn-lg">Want to Get Started?</Link>
      </div>
  )
}

export default HomePage