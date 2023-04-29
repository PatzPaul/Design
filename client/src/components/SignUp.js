import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';


const SignUpPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const {register,watch, handleSubmit,formState:{errors}}=useForm();

  const submitForm = () => {
    console.log("form submitted succesfully");
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }
  return (
    <div className="container">
      <div className="form">
        <h1>Welcome to YummyRecipes</h1>
        <h2>Create a New Account</h2>
        <p>Its Quick and Easy</p>
        <form>
          <Form.Group>
            <Form.Label>
              Username
            </Form.Label>
            <Form.Control type="text" placeholder="Your Username"
              value={username}
              name="username"
              onChange={(e) => { setUsername(e.target.value) }}
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>
              Email
            </Form.Label>
            <Form.Control type="email" placeholder="Your Email"
              value={email}
              name="email"
              onChange={(e) => { setEmail(e.target.value) }}
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>
              Password
            </Form.Label>
            <Form.Control type="password" placeholder="Your Password"
              value={password}
              name="password"
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>
              Confirm Password
            </Form.Label>
            <Form.Control type="password" placeholder="Confirm password"
              value={confirmPassword}
              name="ConfirmPassword"
              onChange={(e) => { setConfirmPassword(e.target.value) }}
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Button as="sub" variant="primary" onClick={submitForm}>SignUp</Button>
          </Form.Group>
        <Form.Group>
          <small>Already have an Account?<Link to="/login">Hop In</Link></small>
        </Form.Group>
        <br></br>

        </form>
      </div>
    </div>
  )
}

export default SignUpPage