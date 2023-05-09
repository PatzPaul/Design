import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import hotDogIcon from './images/hot-dog-icon.png';


const SignUpPage = () => {

  const { register, watch, handleSubmit, formState: { errors }, reset } = useForm();
  const [show, setShow] = useState(true);
  const [serverResponse,setServerResponse]=useState('')


  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0); // 9:00 AM
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0); // 5:00 PM
    if (now.getTime() >= start.getTime() && now.getTime() <= end.getTime()) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  const submitForm = (data) => {
    if (data.password === data.confirmPassword) {

      const body = {
        username: data.username,
        email: data.email
      }

      const requestOptions = {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      }

      fetch('/auth.signup', requestOptions)
        .then(res => res.json())
        .then(data => {
          setServerResponse(data.message)
          console.log(serverResponse)

          setShow(true);
          

        })
        .catch(err => console.log(err))

      reset()
    } else {
      alert("Passwords do not match")
    }
  }

  return (
    <div className="container">
      <div className="form">
        {show ?
          <>
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
              <p>
                {serverResponse}
              </p>
            </Alert>
            <h1 className='heading'>Welcome to YummyRecipes</h1>
          </>
          :
          <h1 className='heading'>Sign Up Here!</h1>
        }
        <img className="logo-container" src={hotDogIcon} alt='logo' />
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
            <br></br>
            {errors.username && <span style={{ color: "red" }}><small>please enter valid username</small></span>}
            {errors.username?.type === "maxLength" && <span style={{ color: "red" }}>Username is too long</span>}
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>
              Email
            </Form.Label>
            <Form.Control type="email" placeholder="Your Email"
              {...register("email", { required: true, maxLength: 80 })}
            />
            <br></br>
            {errors.email && <span style={{ color: "red" }}><small>please enter valid email</small></span>}
            {errors.email?.type === "maxLength" && <span style={{ color: "red" }}>email is too long</span>}
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>
              Password
            </Form.Label>
            <Form.Control type="password" placeholder="Your Password"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && <span style={{ color: "red" }}><small>please enter valid password</small></span>}
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>
              Confirm Password
            </Form.Label>
            <Form.Control type="password" placeholder="Confirm password"
              {...register("confirmPassword", { required: true, minLength: 8 })}
            />
            <br></br>
            {errors.confirmPassword && <span style={{ color: "red" }}><small>please confirm password</small></span>}

          </Form.Group>
          <br></br>
          <Form.Group>
            <Button as="sub" variant="primary" onClick={handleSubmit(submitForm)}>SignUp</Button>
          </Form.Group>
          <br></br>
          <Form.Group>
            <small>Already have an Account?<Link to="/login"> Come on In!</Link></small>
          </Form.Group>
          <br></br>

        </form>
      </div>
    </div>
  )
}

export default SignUpPage;
