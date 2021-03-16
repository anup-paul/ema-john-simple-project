
import { useContext, useState } from 'react';
import { UserContext } from "../../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';


// firebase.initializeApp(firebaseConfig);
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
//   }



function Login() {

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState(
    {
      isSignIn: false,
      name: '',
      email: '',
      photo: ''
    }
  )

    initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } }

 
  const googleSignIn = () =>
  {
      handleGoogleSignIn()
      .then(res => 
        {
          handleResponse(res, true);
            // setUser(res);
            // setLoggedInUser(res);
            // history.replace(from);
        })
  }

  const fbSignIn = () =>
  {
      handleFbSignIn()
      .then(res =>
        {
          handleResponse(res, true);
            // setUser(res);
            // setLoggedInUser(res);
            // history.replace(from);
        })
  }

  const signOut = () =>
  {
    handleSignOut()
    .then(res =>
        {
          handleResponse(res, false);
            // setUser(res);
            // setLoggedInUser(res);
        })
  }




  const handleblur = (event) => {
    // console.log(event.target.name, event.target.value);

    let isFromValid = true;
    if (event.target.name === 'email') {
      isFromValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFromValid = isPasswordValid && passwordHasNumber;
    }
    if (isFromValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (event) => {
    // console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
      // console.log('submitting')
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res =>
        {
          handleResponse(res, true);
            // setUser(res);
            // setLoggedInUser(res);
            // history.replace(from);
        })
    }
    if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email, user.password)
        .then(res =>
          {
            handleResponse(res, true);
            // setUser(res);
            // setLoggedInUser(res);
            // history.replace(from);
          })
    }
    event.preventDefault();
  }

  const handleResponse = (res, redirect) =>
  {
    setUser(res);
    setLoggedInUser(res);
    if(redirect)
    {
      history.replace(from);
    }
  }


  return (
    <div style={{textAlign:'center'}}>

      {
        user.isSignIn
          ? <button onClick={signOut} >Sign Out</button>
          : <button onClick={googleSignIn} >Sign In</button>
      }
      <br />
      <button onClick={fbSignIn}>Sign in with FaceBook</button>

      {
        user.isSignIn && <div>
          <h2>Welcome {user.name}</h2>
          <h3>Email: {user.email}</h3>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our Own Authentication</h1>

      {/* <p>Name:{user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}

      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User sign up</label>

      <form onSubmit={handleSubmit}>
        {
          newUser && <input type="text" name="name" onBlur={handleblur} placeholder="enter your name" />
        }
        <br />
        <input type="text" onBlur={handleblur} name="email" placeholder="enter your email address" id="" required />
        <br />
        <input type="password" onBlur={handleblur} name="password" placeholder="enter your password" id="" required />
        <br />
        <input type="submit" value="Submit " />
      </form>

      <p style={{ color: 'red' }} >{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }} >User {newUser ? 'Created' : 'Logged In'}successfully</p>
      }

    </div>
  );
}

export default Login;
