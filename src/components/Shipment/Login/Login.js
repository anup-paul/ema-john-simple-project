import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from "../../../App";
import { useHistory, useLocation } from "react-router";


// firebase.initializeApp(firebaseConfig);
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
//   }
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


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

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } }

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signInUser =
        {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signInUser);
        // console.log(displayName, email, photoURL);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }


  const handleFbSignIn = () => {
    firebase.auth().signInWithPopup(facebookProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
        console.log('sign in with faceBook:' ,user)
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
  }


  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signOutUser =
        {
          isSignIn: false,
          name: '',
          email: '',
          password: '',
          photo: '',
          error: '',
          success: false
        }
        setUser(signOutUser)
      })
      .catch(err => {

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
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          // console.log(res)
          // Signed in 
          // var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // ..
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          // // Signed in
          // var user = userCredential.user;
          // // ...
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // var errorCode = error.code;
          // var errorMessage = error.message;
        });
    }
    event.preventDefault();
  }


  return (
    <div style={{textAlign:'center'}}>

      {
        user.isSignIn
          ? <button onClick={handleSignOut} >Sign Out</button>
          : <button onClick={handleSignIn} >Sign In</button>
      }
      <br />
      <button onClick={handleFbSignIn}>Sign in with FaceBook</button>

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
        <input type="submit" value="Submit" />
      </form>

      <p style={{ color: 'red' }} >{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }} >User {newUser ? 'Created' : 'Logged In'}successfully</p>
      }

    </div>
  );
}

export default Login;
