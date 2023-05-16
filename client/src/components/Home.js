import React from 'react';
import {Link} from 'react-router-dom';
import hotDogIcon from './images/hot-dog-icon.png';
import { useAuth } from '../auth';

const LoggedInHome=()=>{
  return(
      <div className="recipes">
        <img className="logo-container" src={hotDogIcon} alt='logo' />
        <h1 className="heading">Recipes List</h1>
        </div>
        )


}

const LoggedOutHome=()=>{
  return(
    <div className="home container">
      <img className="logo-container" src={hotDogIcon} alt='logo' />
      <h1 className="heading">Recipes For Thought</h1>
      <h2>Recipes That Let You Explore and Think Outside The Box</h2>
      <p>All In One Place</p>
      <Link to="/signup"  className="btn btn-primary btn-lg">Want to Get Started?</Link>
      </div>
  )
}


const HomePage=()=>{

  const [logged]=useAuth();
  return(
    <div>
    logged? <LoggedInHome /> : <LoggedOutHome />
    </div>
  )
}

export default HomePage