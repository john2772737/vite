import { useState, useRef } from "react";
import { auth } from "../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "react-phone-input-2/lib/style.css";
import Input, { isValidPhoneNumber } from "react-phone-number-input/input";
import "../css/sellerRegistration.css";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";

import { imageDb } from "../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const PhoneVerification = () => {
  const [step, setStep] = useState("phone"); // 'phone' or 'verification'
  const [phoneNumber, setPhoneNumber] = useState("+63");
  const [verificationCode, setVerificationCode] = useState("");
  const [user, setUser] = useState(""); // Initialize user state as null

  const navigate = useNavigate();

  const [Data, setData] = useState({
    firstname: "",
    lastname: "",
    shopname: "",
    password: "",
    email: "",
    birthday: "",
    phoneNumber: "",
    picture: null,
    idPicture: "",
  });

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    console.log(phoneNumber);
    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("Invalid phone number");
      return;
    }

    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
          }
        );
      }

      window.recaptchaVerifier.render();

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );

      window.confirmationResult = confirmationResult;

      setStep("verification");
    } catch (error) {
      console.error("Error signing in with phone number:", error);
      if (error.code === "auth/too-many-requests") {
        toast.error("Too many Request, Try again later.");
      }
    }
  };

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    setData((prevData) => ({
      ...prevData,
      phoneNumber: value,
    }));
  };

  const [uid, setuid] = useState("");
  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    try {
      await window.confirmationResult.confirm(verificationCode);

      const exists = await axios.get(
        `http://localhost:4000/seller/findPhoneNumber/${phoneNumber}`
      );

      const seller = exists.data.seller;

      if (exists.data.found === false) {
        const result = await axios.post(
          "http://localhost:4000/seller/createphone",
          Data
        );

        toast.success(result.data.message);
        setStep("form");
        return;
      }

      setuid(seller._id);

      if (seller.submit === false) {
        // The 'submit' field is set to true
        console.log("Seller has not been submitted");
        setStep("form");
        return;
      } else {
        if (seller.approved === false) {
          // The'submitted' field is set to true
          console.log("Seller is not approved");
          setStep("wait");
          return;
        }
        navigate("/seller");
      }
    } catch (error) {
      console.error("Error confirming verification code:", error);

      if (error.code === "auth/invalid-verification-code") {
        toast.error("Invalid Verification Code");
      } else {
        toast.error(error.message);
      }
    }
  };

  const uploadPhoto = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/seller/checkEmail/${Data.email}`
      );
      console.log(response.data.found);
      if (response.data.found === true) {
        toast.error(response.data.message);
        return;
      }
  
      const shopResponse = await axios.get(
        `http://localhost:4000/seller/checkShopname/${Data.shopname}`
      );
  
      if (shopResponse.data.found === true) {
        toast.error(shopResponse.data.message);
        return;
      }
  
      if (Data.password !== confirmPass) {
        toast.error("Password do not Match");
        return;
      }
      
      setStep("Photo");
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle error, show toast message or log it
    }
  };
  

  const saveUser = (event) => {
    event.preventDefault();
    // Assuming idPicture is set in your data state
    const profilePictureFile = picture;
    const idPictureFile = idp;

    if (!profilePictureFile || !idPictureFile) {
      console.error("Both profile picture and ID picture are required");
      return;
    }

    const profilePictureRef = ref(
      imageDb,
      "profiles/" + profilePictureFile.name
    );
    const idPictureRef = ref(imageDb, "profiles/" + idPictureFile.name);

    // Upload the profile picture
    uploadBytes(profilePictureRef, profilePictureFile)
      .then((profileSnapshot) => {
        console.log("Profile picture uploaded successfully:", profileSnapshot);
        // Retrieve the download URL of the profile picture
        getDownloadURL(profilePictureRef)
          .then((profileUrl) => {
            console.log("Profile picture download URL:", profileUrl);
            // Upload the ID picture
            uploadBytes(idPictureRef, idPictureFile)
              .then((idSnapshot) => {
                console.log("ID picture uploaded successfully:", idSnapshot);
                // Retrieve the download URL of the ID picture
                getDownloadURL(idPictureRef)
                  .then((idUrl) => {
                    console.log("ID picture download URL:", idUrl);
                    // Once both pictures are uploaded and URLs are obtained, you can proceed with saving the user data or any other actions
                  })
                  .catch((error) => {
                    console.error(
                      "Error getting ID picture download URL:",
                      error
                    );
                  });
              })
              .catch((error) => {
                console.error("Error uploading ID picture:", error);
              });
          })
          .catch((error) => {
            console.error("Error getting profile picture download URL:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading profile picture:", error);
      });

    axios.post("");
  };

  console.log(Data);
  const handleFormChanges = (event) => {
    const { name, value } = event.target;

    setData({
      ...Data,
      [name]: value,
    });
  };

  const [confirmPass, setConfirmpass] = useState("");

  const handleConfirmPassChange = (e) => {
    setConfirmpass(e.target.value);
  };
  const [idp, setId] = useState("");
  console.log(idp);
  const handleId = (event) => {
    const file = event.target.files[0];

    setId(file);
  };

  const [picture, setPicture] = useState("");

  const handlePicture = (event) => {
    const file = event.target.files[0];

    setPicture(file);
  };

  return (
    <div>
      <Toaster />
      <div className="sellerReg ">
        <Navbar />
        {step === "phone" && (
          <MDBContainer fluid className="HEY ">
            <MDBRow className="d-flex justify-content-center align-items-center ">
              <MDBCol>
                <MDBCard className="my-4">
                  <MDBRow className="g-0">
                    <MDBCol md="6">
                      <MDBCardImage
                        style={{ height: "80vh" }}
                        src="https://i0.wp.com/www.adobomagazine.com/wp-content/uploads/2021/09/Lazada-launches-Start-It-Up-Laz-It-Up-program-for-more-accessible-business-registration-on-the-platform-HERO.jpg?w=1440&ssl=1"
                        alt="Sample photo"
                        className="rounded"
                        fluid
                      />
                    </MDBCol>

                    <MDBCol md="6">
                      <MDBCardBody className="text-black d-flex flex-column justify-content-center ">
                        <MDBCardTitle className="mb-4 text-uppercase fw-bold">
                          Create your Booklot Store Now!{" "}
                        </MDBCardTitle>
                        <MDBCardText className="mb-4 ">
                          Enter your Mobile Number to Start Selling.
                        </MDBCardText>
                        <MDBRow>
                          <MDBCardText>
                            <Input
                              country="PH"
                              international
                              withCountryCallingCode
                              value={phoneNumber}
                              onChange={handlePhoneChange}
                              maxLength={16}
                            />
                          </MDBCardText>
                        </MDBRow>
                        <div id="recaptcha-container"></div>
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
                              value={Data.firstname}
                              onChange={handleFormChanges}
                              name="firstname"
                            />
                          </MDBCol>

                          <MDBCol md="6">
                            <MDBInput
                              wrapperClass="mb-4"
                              label="Last Name"
                              size="lg"
                              id="form2"
                              type="text"
                              value={Data.lastname}
                              onChange={handleFormChanges}
                              name="lastname"
                            />
                          </MDBCol>
                        </MDBRow>

                        <MDBInput
                          wrapperClass="mb-4"
                          label="Birthday"
                          size="lg"
                          id="form3"
                          type="date"
                          value={Data.birthday}
                          onChange={handleFormChanges}
                          name="birthday"
                        />

                        <MDBInput
                          wrapperClass="mb-4"
                          label="Shop Name"
                          size="lg"
                          id="form4"
                          type="text"
                          value={Data.shopname}
                          onChange={handleFormChanges}
                          name="shopname"
                        />
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Email"
                          size="lg"
                          id="form5"
                          type="email"
                          value={Data.email}
                          onChange={handleFormChanges}
                          name="email"
                        />

                        <MDBInput
                          wrapperClass="mb-4"
                          label="Password"
                          size="lg"
                          id="form7"
                          type="password"
                          value={Data.password}
                          onChange={handleFormChanges}
                          name="password"
                        />

                        <MDBInput
                          wrapperClass="mb-4"
                          label="Confirm Password"
                          size="lg"
                          id="form6"
                          type="password"
                          value={confirmPass}
                          onChange={handleConfirmPassChange}
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
                            accept="image/*"
                            capture="filesystem"
                            name="picture"
                            onChange={handlePicture}
                          />

                          <MDBCardText>Upload your Valid ID here: </MDBCardText>
                          <MDBInput
                            wrapperClass="mb-4"
                            size="lg"
                            id="form4"
                            type="file"
                            accept="image/*"
                            capture="filesystem"
                            name="idPicture"
                            onChange={handleId}
                          />

                          <div className="d-flex justify-content-end pt-3">
                            <MDBBtn color="light" size="lg">
                              Reset all
                            </MDBBtn>
                            <MDBBtn
                              className="ms-2"
                              color="danger"
                              size="lg"
                              onClick={saveUser}
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
