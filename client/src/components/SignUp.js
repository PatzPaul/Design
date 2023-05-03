import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const SignUpPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { register, watch, handleSubmit, formState: { errors } } = useForm();

  const submitForm = (data) => {
    console.log(data);
  }
  console.log(watch("username"));
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
              {...register("username", { required: true, maxLength: 25 })}
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>
              Email
            </Form.Label>
            <Form.Control type="email" placeholder="Your Email"
              {...register("email", { required: true, maxLength: 80 })}
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>
              Password
            </Form.Label>
            <Form.Control type="password" placeholder="Your Password"
              {...register("password", { required: true, minLength: 8 })}
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>
              Confirm Password
            </Form.Label>
            <Form.Control type="password" placeholder="Confirm password"
              {...register("confirmPassword", { required: true, minLength: 8 })}
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Button as="sub" variant="primary" onClick={handleSubmit(submitForm)}>SignUp</Button>
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