import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import "../css/userRegistration.css";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  

} from "firebase/auth";
import { auth } from "../utils/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

function App() {
  const navigate = useNavigate();
  const [Data, setData] = useState({
    id: "",
    name: "",
    email: "",
    photo: "",
  });

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
  
      const result = await signInWithPopup(auth, provider);
  
      const user = result.user;
      setData({
        uid: user.uid,
        
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });
  
      toast.success("Successfully Logged In");
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        // You can provide the user with options to resolve the situation,
        // such as linking their Facebook account with their existing account.
        // For example, you can guide them to a page where they can choose
        // to link their accounts or sign in with their existing account directly.
        // You may also want to provide a way for users to contact support for assistance.
        toast.error("Failed to Log In.The email of this account is already registered to this website.");
  
        // You may choose to redirect the user to another page for handling this situation.
        // For example:
        // history.push('/resolve-account-issue');
      } else {
        toast.error("Failed to Logged In");
      }
    }
  };
  
  const signInWithGooogle = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result.user;
     
      console.log(user)
      console.log(user.uid)
      setData({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });

      toast.success("Successfully Logged In");
      signInWithProvider()
    } catch (error) {

      
      console.log(error);
    }
  };

  const signInWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      setData({
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(Data)

  const signInWithProvider = async () => {
    try {
      // Make a POST request to your backend endpoint
      const response = await axios.post('http://localhost:4000/user/createUser', Data);
      
      // Handle the response
      console.log('User data:', response.data.user);
      // You can redirect the user or perform other actions based on the response
    } catch (error) {
      // Handle errors
      console.error('Error signing in:', error);
      // You can display an error message to the user or perform other actions based on the error
    }
  };

  const userRegistration=()=>{
    navigate('/userRegistration')
  }
  
  return (
    <div>
      <Toaster />
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden"
      >
        <MDBRow>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1
              className="my-5 display-3 fw-bold ls-tight px-3"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              The best offer <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                for your business
              </span>
            </h1>

            <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
              tempora at cupiditate quis eum maiores libero veritatis? Dicta
              facilis sint aliquid ipsum atque?
            </p>
          </MDBCol>

          <MDBCol md="6" className="position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>

            <MDBCard className="my-5 bg-glass">
              <MDBCardBody className="p-5">
                <h2>
                  Sign In <i className="fa fa-sign-in-alt mb-5"></i>
                </h2>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="form3"
                  type="email"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form4"
                  type="password"
                />

                <div className="d-flex justify-content-center mb-4">
                  <a href="/forgot-password">Forgot Password?</a>
                </div>

                <MDBBtn className="w-100 mb-4" size="md">
                  sign in
                </MDBBtn>
                <MDBBtn
                  className="w-100 mb-4"
                  size="md"
                  onClick={userRegistration}
                >
                  sign up
                </MDBBtn>

                <div className="text-center">
                  <p>or sign in with:</p>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                    onClick={signInWithFacebook}
                  >
                    <MDBIcon fab icon="facebook-f" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                    onClick={signInWithGooogle}
                  >
                    <MDBIcon fab icon="google" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                    onClick={signInWithGithub}
                  >
                    <MDBIcon fab icon="github" size="sm" />
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default App;
