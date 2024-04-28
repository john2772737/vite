import { useState } from "react";
import { auth } from "../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Bg from "../images/asas.png";
import "../css/sellerRegistration.css";
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
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

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
      //
  // Confirm the verification code entered by the user
   //   const result = await window.confirmationResult.confirm(verificationCode);
      console.log("gppd")

      
      
      
    
      setStep("form");
      // User signed in successfully

      // Proceed with any other logic here
    } catch (error) {
      // User couldn't sign in (bad verification code or other error)
      console.error("Error confirming verification code:", error);
      // Optionally, display an error message to the user
    }
  };

  const uploadPhoto = () => {
    setStep("Photo");
  };

  const newPassword = () => {
    setStep("Password");
  };

  const handledataSubmit = () => {
    setStep("wait");
  };

  return (
    <div>
      <div className="sellerReg">
        <Navbar />
        {step === "phone" && (
          <MDBContainer fluid className="HEY" size="sm">
            <MDBRow className="d-flex justify-content-center align-items-center ">
              <MDBCol>
                <MDBCard className="my-4">
                  <MDBRow className="g-0">
                    <MDBCol md="6">
                      <MDBCardImage
                        src=""
                        alt="Sample photo"
                        className="rounded"
                        fluid
                      />
                    </MDBCol>

                    <MDBCol md="6">
                      <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                        <MDBCardTitle className="mb-2 text-uppercase fw-bold">
                          Create your Booklot Store Now!{" "}
                        </MDBCardTitle>
                        <MDBCardText>
                          Enter your Mobile Number to Start Selling.
                        </MDBCardText>
                        <MDBRow>
                          <MDBCardText>
                            Verify your Phone Number:
                            <PhoneInput
                              className="phone-input"
                              country={"ph"}
                              onlyCountries={["ph"]}
                              value={phoneNumber}
                              onChange={setPhoneNumber}
                            />
                          </MDBCardText>
                        </MDBRow>
                        <div>
                          <button
                            type="submit"
                            className="verify-btn"
                            onClick={handlePhoneSubmit}
                          >
                            Verify with SMS
                          </button>
                        </div>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>

                <div id="appVerifier"></div>
                <Toaster />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )}
        {step === "verification" && (
          <MDBContainer fluid className="HEY" size="sm">
            <MDBRow className="d-flex justify-content-center align-items-center ">
              <MDBCol>
                <MDBCard className="my-4">
                  <MDBRow className="g-0">
                    <MDBCol md="6">
                      <MDBCardImage
                        src=""
                        alt="Sample photo"
                        className="rounded"
                        fluid
                      />
                    </MDBCol>

                    <MDBCol md="6">
                      <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                        <MDBCardTitle className="mb-2 text-uppercase fw-bold">
                          Create your Booklot Store Now!{" "}
                        </MDBCardTitle>
                        <MDBCardText>Enter your verification code.</MDBCardText>
                        <MDBRow>
                          <MDBCardText>
                            Verification Code:
                            <MDBInput
                              className="code-input"
                              type="text"
                              value={verificationCode}
                              onChange={(e) =>
                                setVerificationCode(e.target.value)
                              }
                            />
                          </MDBCardText>
                        </MDBRow>
                        <div>
                          <button
                            className="code-btn"
                            type="submit"
                            onClick={handleVerificationSubmit}
                          >
                            Verify
                          </button>
                        </div>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )}

        {step === "form" && (
          <MDBContainer fluid className="HEY" size="sm">
            <MDBRow className="d-flex justify-content-center align-items-center ">
              <MDBCol>
                <MDBCard className="my-4">
                  <MDBRow className="g-0">
                    <MDBCol md="6">
                      <MDBCardImage
                        src="{Bg}"
                        alt="Sample photo"
                        className="rounded"
                        fluid
                      />
                    </MDBCol>

                    <MDBCol md="6">
                      <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                        <MDBCardTitle className="mb-4 text-uppercase fw-bold">
                          SELLER REGISTRATION
                        </MDBCardTitle>
                        <MDBCardText>
                          Please fill out all the required fields to complete
                          the registration process.
                        </MDBCardText>

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
                          type="date"
                        />

                        <MDBInput
                          wrapperClass="mb-4"
                          label="Shop Name"
                          size="lg"
                          id="form4"
                          type="text"
                        />
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Email"
                          size="lg"
                          id="form5"
                          type="text"
                        />

                        <div className="d-flex justify-content-end pt-3">
                          <MDBBtn color="light" size="lg">
                            Reset all
                          </MDBBtn>
                          <MDBBtn
                            className="ms-2"
                            color="danger"
                            size="lg"
                            onClick={uploadPhoto}
                          >
                            Proceed
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

        {step == "Photo" && (
          <div>
            <MDBContainer fluid className="HEY" size="sm">
              <MDBRow className="d-flex justify-content-center align-items-center ">
                <MDBCol>
                  <MDBCard className="my-4">
                    <MDBRow>
                      <MDBCol md="">
                        <MDBCardImage
                          position="left"
                          src="{Bg}"
                          alt="Sample photo"
                          className="rounded"
                          fluid
                        />
                      </MDBCol>

                      <MDBCol md="6">
                        <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                          <MDBCardTitle className="mb-4 text-uppercase fw-bold">
                            SELLER REGISTRATION
                          </MDBCardTitle>
                          <MDBCardText>
                            Please fill out all the required fields to complete
                            the registration process.
                          </MDBCardText>

                          <MDBCardText>
                            Upload your Profile Picture here:{" "}
                          </MDBCardText>
                          <MDBInput
                            wrapperClass="mb-4"
                            size="lg"
                            id="form3"
                            type="file"
                          />

                          <MDBCardText>Upload your Valid ID here: </MDBCardText>
                          <MDBInput
                            wrapperClass="mb-4"
                            size="lg"
                            id="form4"
                            type="file"
                          />

                          <div className="d-flex justify-content-end pt-3">
                            <MDBBtn color="light" size="lg">
                              Reset all
                            </MDBBtn>
                            <MDBBtn
                              className="ms-2"
                              color="danger"
                              size="lg"
                              onClick={newPassword}
                            >
                              Proceed
                            </MDBBtn>
                          </div>
                        </MDBCardBody>
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        )}

        {step == "Password" && (
          <div>
            <MDBContainer fluid className="HEY" size="sm">
              <MDBRow className="d-flex justify-content-center align-items-center ">
                <MDBCol>
                  <MDBCard className="my-4">
                    <MDBRow>
                      <MDBCol md="">
                        <MDBCardImage
                          position="left"
                          src="{Bg}"
                          alt="Sample photo"
                          className="rounded"
                          fluid
                        />
                      </MDBCol>

                      <MDBCol md="6">
                        <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                          <MDBCardTitle className="mb-4 text-uppercase fw-bold">
                            SELLER REGISTRATION
                          </MDBCardTitle>
                          <MDBCardText>
                            Please fill out all the required fields to complete
                            the registration process.
                          </MDBCardText>

                          <MDBInput
                            wrapperClass="mb-4"
                            label="New Password"
                            size="lg"
                            id="form3"
                            type="password"
                          />

                          <MDBInput
                            wrapperClass="mb-4"
                            label="Confirm Password"
                            size="lg"
                            id="form4"
                            type="password"
                          />

                          <div className="d-flex justify-content-end pt-3">
                            <MDBBtn color="light" size="lg">
                              Reset all
                            </MDBBtn>
                            <MDBBtn
                              className="ms-2"
                              color="danger"
                              size="lg"
                              onClick={handledataSubmit}
                            >
                              Proceed
                            </MDBBtn>
                          </div>
                        </MDBCardBody>
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        )}

        {step === "wait" && (
          <MDBContainer fluid className="wait-page" my="4">
            <MDBRow
              id="wait-content"
              className="d-flex justify-content-center align-items-center "
            >
              <h1>We're evaluating your profile.</h1>
              <p>
                In order to maintain our community standards, each profile is
                carefully reviewed before approval.
              </p>
            </MDBRow>

            <button type="submit">OK</button>
          </MDBContainer>
        )}
      <div>
          <Footer />
        </div>
      </div>

    </div>
  );
};

export default PhoneVerification;
