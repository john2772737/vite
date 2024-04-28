import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

import axios from "axios";

function App() {
  const navigate = useNavigate();

  const userLogin = () => {
    navigate("/userLogin");
  };
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    birthday: "",
    phoneNumber: "",
    voucher: "",
  });


  const handleinputChanges = (event) => {
    const { name, value } = event.target;
    // Update the form data state with the new value
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:4000/user/createUser",
        formData
      );
      console.log("User created:", result.data);
    } catch (error) {
      if (error.response.status === 409) {
        toast.error(error.response.data.message); // Display the error message from the backend
      } else {
        toast.error("An error occurred"); // Display a generic error message for other errors
      }
    }
  };
  return (
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient overflow-hidden"
    >
      <MDBRow>
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
            <Toaster />
            <MDBCardBody className="p-5">
              <h2>
                Sign Up <i className="fa fa-sign-in-alt mb-5"></i>
              </h2>
              <MDBRow>
                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="First name"
                    id="form1"
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleinputChanges}
                  />
                </MDBCol>

                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Last name"
                    id="form2"
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleinputChanges}
                  />
                </MDBCol>
              </MDBRow>
              <MDBInput
                wrapperClass="mb-4"
                label="username"
                id="form5"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleinputChanges}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form3"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleinputChanges}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form4"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleinputChanges}
              />

              <div className="d-flex justify-content-center mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Subscribe to our newsletter"
                />
              </div>
              <MDBBtn
                className="w-100 mb-4"
                size="md"
                style={{
                  background: "rgba(160, 78, 71, 1)",
                  transition: "background-color 0.3s", // Adding transition for smooth color change
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "red";
                }} // Change background color on hover
                onMouseOut={(e) => {
                  e.target.style.background = "rgba(160, 78, 71, 1)";
                }} // Revert back to original color
                onClick={handleSubmit}
              >
                sign up
              </MDBBtn>

              <MDBBtn className="w-100 mb-4" size="md" onClick={userLogin}>
                sign in
              </MDBBtn>

              <div className="text-center">
                <p>or sign in with:</p>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{
                    color: "rgba(160, 78, 71, 1)",
                    transition: "color 0.3s", // Adding transition for smooth color change
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "red";
                  }} // Change color on hover
                  onMouseOut={(e) => {
                    e.target.style.color = "rgba(160, 78, 71, 1)";
                  }} // Revert back to original color
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{
                    color: "rgba(160, 78, 71, 1)",
                    transition: "color 0.3s", // Adding transition for smooth color change
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "red";
                  }} // Change color on hover
                  onMouseOut={(e) => {
                    e.target.style.color = "rgba(160, 78, 71, 1)";
                  }} // Revert back to original color
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{
                    color: "rgba(160, 78, 71, 1)",
                    transition: "color 0.3s", // Adding transition for smooth color change
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "red";
                  }} // Change color on hover
                  onMouseOut={(e) => {
                    e.target.style.color = "rgba(160, 78, 71, 1)";
                  }} // Revert back to original color
                >
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
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
            itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
            at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
            aliquid ipsum atque?
          </p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
