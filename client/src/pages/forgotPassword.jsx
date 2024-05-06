import React, { useState } from 'react';
import { Link } from "react-router-dom";
import backgroundImage from "../components/images/booklot_bg.png";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdb-react-ui-kit";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Add your reset password logic here
    if (email.trim() === '') {
      setErrorMessage('Email is required.');
    } else {
      // Call your reset password API or perform the necessary action
      console.log('Reset password for email:', email);
    }
  };

  return (
    <div>
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      >
        <MDBRow>
          <MDBCol md="6" className="position-relative" style={{ opacity: "1", fontFamily: "League Spartan" }}>
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
                  Reset Password <i className="fa fa-lock mb-5"></i>
                </h2>

                <form onSubmit={handleResetPassword}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  />
                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                  <MDBBtn
                    type="submit"
                    className="w-100 mt-4"
                    size="md"
                    style={{ backgroundColor: "#ef3a29" }}
                  >
                    Reset Password
                  </MDBBtn>
                </form>

                <div className="text-center mt-3">
                  <p>Remembered your password? <Link to="/userLogin" className="text-indigo-600 font-medium">Sign In</Link></p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default ForgotPassword;
