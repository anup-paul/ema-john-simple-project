import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
}


export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const { displayName, email, photoURL } = res.user;
      const signInUser =
      {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      setUserToken();
      return signInUser;
      // console.log(displayName, email, photoURL);
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
}


export const handleFbSignIn = () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(facebookProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // The signed-in user info.
      var user = result.user;
      user.success = true;
      return user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;

      // ...
      // console.log('sign in with faceBook:' ,user)
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


export const handleSignOut = () => {
  return firebase.auth().signOut()
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
      return signOutUser;
    })
    .catch(err => {

    })
}


export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo
      // console.log(res)
      // Signed in 
      // var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      // setUser(newUserInfo);
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // ..
    });
}


export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
      // setUser(newUserInfo);
      // setLoggedInUser(newUserInfo);
      // history.replace(from);
      // console.log(res.user)
      // // Signed in
      // var user = userCredential.user;
      // // ...
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo
      // setUser(newUserInfo);
      // var errorCode = error.code;
      // var errorMessage = error.message;
    });
}

const setUserToken = () => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
    sessionStorage.setItem('token',idToken);
  }).catch(function (error) {
    // Handle error
  });
}

const updateUserName = name => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  }).then(function () {
    console.log("update User name successfully")
  }).catch(function (error) {
    console.log(error)
  });
}