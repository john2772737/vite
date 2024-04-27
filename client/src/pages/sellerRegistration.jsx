import { useState } from "react";
import { auth } from "../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { toast, Toaster } from "react-hot-toast";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
} from "mdb-react-ui-kit";

const PhoneVerification = () => {
  const [step, setStep] = useState("phone"); // 'phone' or 'verification'
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [user, setUser] = useState(""); // Initialize user state as null

  console.log(verificationCode);

  const handlePhoneSubmit = async (e) => {
    try {
      /*  e.preventDefault();
      const appVerifier = new RecaptchaVerifier(auth, "appVerifier", {});
      const newPhoneNumber = "+" + phoneNumber;
  
      // Sign in with phone number and await confirmation result
      const confirmationResult = await signInWithPhoneNumber(auth, newPhoneNumber, appVerifier);
      
      // Store the confirmationResult for later use (optional)
      window.confirmationResult = confirmationResult;

      */
      setStep("verification");
      // Proceed with any other logic here
    } catch (error) {
      // Handle any errors that occur during the sign-in process
      console.error("Error signing in with phone number:", error);
      // Optionally, display an error message to the user
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    try {
      /*
  // Confirm the verification code entered by the user
      const result = await window.confirmationResult.confirm(verificationCode);
      console.log("gppd")
      
      
    */
      setStep("form");
      // User signed in successfully

      // Proceed with any other logic here
    } catch (error) {
      // User couldn't sign in (bad verification code or other error)
      console.error("Error confirming verification code:", error);
      // Optionally, display an error message to the user
    }
  };

  const handledataSubmit = () => {
    setStep("wait");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "wheat",
      }}
    >
      {step === "phone" && (
        <form>
          <label>
            Phone Number:
            <PhoneInput
              country={"ph"}
              onlyCountries={["ph"]}
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
          </label>
          <button type="submit" onClick={handlePhoneSubmit}>
            Submit
          </button>
          <div id="appVerifier"></div>
          <Toaster />
        </form>
      )}
      {step === "verification" && (
        <form>
          <label>
            Verification Code:
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </label>
          <button type="submit" onClick={handleVerificationSubmit}>
            Verify
          </button>
        </form>
      )}

      {step === "form" && (
        <MDBContainer fluid className="bg-dark" size="sm">
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol>
              <MDBCard className="my-4">
                <MDBRow className="g-0">
                  <MDBCol md="6" className="d-none d-md-block">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                      alt="Sample photo"
                      className="rounded-start"
                      fluid
                    />
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                      <h3 className="mb-5 text-uppercase fw-bold">
                        Student registration form
                      </h3>

                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass="mb-4"
                            label="First Name"
                            size="lg"
                            id="form1"
                            type="text"
                          />
                        </MDBCol>

                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass="mb-4"
                            label="Last Name"
                            size="lg"
                            id="form2"
                            type="text"
                          />
                        </MDBCol>
                      </MDBRow>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Birthday"
                        size="lg"
                        id="form3"
                        type="text"
                      />

                      <div className="d-md-flex ustify-content-start align-items-center mb-4">
                        <h6 className="fw-bold mb-0 me-4">Gender: </h6>
                        <MDBRadio
                          name="inlineRadio"
                          id="inlineRadio1"
                          value="option1"
                          label="Female"
                          inline
                        />
                        <MDBRadio
                          name="inlineRadio"
                          id="inlineRadio2"
                          value="option2"
                          label="Male"
                          inline
                        />
                        <MDBRadio
                          name="inlineRadio"
                          id="inlineRadio3"
                          value="option3"
                          label="Other"
                          inline
                        />
                      </div>

                      <MDBRow>
                        <MDBCol md="6">{/* Removed MDBSelect */}</MDBCol>

                        <MDBCol md="6">{/* Removed MDBSelect */}</MDBCol>
                      </MDBRow>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Pincode"
                        size="lg"
                        id="form4"
                        type="text"
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Course"
                        size="lg"
                        id="form5"
                        type="text"
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Email ID"
                        size="lg"
                        id="form6"
                        type="text"
                      />

                      <div className="d-flex justify-content-end pt-3">
                        <MDBBtn color="light" size="lg">
                          Reset all
                        </MDBBtn>
                        <MDBBtn
                          className="ms-2"
                          color="warning"
                          size="lg"
                          onClick={handledataSubmit}
                        >
                          Submit form
                        </MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      )}

      {step === "wait" && (
        <div>
          <h1>please wait for approval</h1>
        </div>
      )}
    </div>
  );
};

export default PhoneVerification;
