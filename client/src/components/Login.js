import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import hotDogIcon from './images/hot-dog-icon.png';
import { login } from '../auth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const LoginPage=()=>{

  const {register,handleSubmit,watch,reset,formState:{errors}}=useForm()

  const history=useHistory()


  const loginUser=(data)=>{
    
    console.log(data)

    const requestOptions = {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    fetch('/auth.login', requestOptions)
        .then(res => res.json())
        .then(data => {
          console.log(data.access_token)
          login(data.access_token)
          history.push('/')

        })

    reset()
  }


  return(
    <div className="container">
    <div className="form">
    <img className="logo-container" src={hotDogIcon} alt='logo' />
      <h1 className='heading'>Step Into The World Of Exquisite Taste</h1>
      <form>
        <Form.Group>
          <Form.Label>
            Username
          </Form.Label>
          <Form.Control type="text" placeholder="Your Username"
            {...register('username',{required:true,maxLength:25})}
          />
        </Form.Group>
        {errors.username && <p style={{color:'red'}}><small>Username is required</small></p>}
        {errors.username?.type === "maxLength" && <p style={{color:'red'}}><small>Username should be twentyfive or less characters</small></p>}
        <br></br>
        <Form.Group>
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control type="password" placeholder="Your Password"
            {...register('password',{required:true,minLength:8})}
          />
        </Form.Group>
        {errors.password && <p style={{color:'red'}}><small>Password is required</small></p>}
        {errors.password?.type === "minLength" && <p style={{color:'red'}}><small>Password should be more than 8 characters</small></p>}
        <br></br>
        <Form.Group>
          <Button as="sub" variant="primary" onClick={handleSubmit(loginUser)}>Log In</Button>
        </Form.Group>
        <Form.Group>
          <small>Don't have an Account?<Link to="/signup">Join us</Link></small>
        </Form.Group>
        <br></br>

      </form>
    </div>
  </div>
  )
}

export default LoginPage