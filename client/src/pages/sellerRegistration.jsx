import { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
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

import axios from "axios";

import { imageDb } from "../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useFirebase } from "../utils/context";
import Bg from "../components/images/Register.png";

const PhoneVerification = () => {
  const [step, setStep] = useState("phone"); // 'phone' or 'verification'
  const [phoneNumber, setPhoneNumber] = useState("+63");
  const [verificationCode, setVerificationCode] = useState("");

  const [isFocused, setIsFocused] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useFirebase();

  useEffect(() => {
    if (currentUser) {
      navigate("/seller/dashboard");
    }
  }, [currentUser, navigate]);

  const sample = () => {
    setStep("unapproved");
  };

  const [Data, setData] = useState({
    firebaseuid: "",
    firstname: "",
    lastname: "",
    shopname: "",
    password: "",
    email: "",
    birthday: "",
    phoneNumber: "",
    picture: "",
    idPicture: "",
  });

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setIsClicked(true);

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
    setIsClicked(true);

    // Check if verification code is empty or not exactly 6 digits
    if (verificationCode.trim() === "" || verificationCode.length !== 6) {
      toast.error("Verification code must be 6 digits");
      return;
    }

    try {
      await window.confirmationResult.confirm(verificationCode);
      await setPersistence(auth, browserLocalPersistence);

      const exists = await axios.get(
        `http://localhost:4000/seller/findPhoneNumber/${phoneNumber}`
      );

      const seller = exists.data.seller;

      if (exists.data.found === false) {
        signOut(auth);

        setData({
          firebaseuid: auth.currentUser.uid,
        });
        const result = await axios.post(
          "http://localhost:4000/seller/createphone",
          Data
        );

        const uid = result.data._id;

        setuid(uid);

        toast.success(result.data.message);
        setStep("form");
        return;
      }

      setuid(seller._id);

      if (seller.submit === "false") {
        signOut(auth);
        setStep("form");
        return;
      }
      if (seller.approved === "false") {
        signOut(auth);

        setStep("wait");

        return;
      }

      if (seller.approved === "unapproved") {
        signOut(auth);

        setStep("unapproved");
        return;
      }

      navigate("/seller");
    } catch (error) {
      console.error("Error confirming verification code:", error);

      if (error.code === "auth/invalid-verification-code") {
        toast.error("Invalid Verification Code");
      } else {
        toast.error(error.message);
      }
    }
  };

  const uploadPhoto = () => {
    setIsClicked(true);

    // Check if any field is empty
    if (
      Data.firstname === "" ||
      Data.lastname === "" ||
      Data.shopname === "" ||
      Data.email === "" ||
      Data.password === "" ||
      confirmPass === "" ||
      Data.birthday === ""
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    if (Data.password !== confirmPass) {
      toast.error("Password do not Match");
      return;
    }

    if (Data.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setStep("Photo");
  };

  const resetForm = () => {
    setData({
      firstname: "",
      lastname: "",
      shopname: "",
      password: "",
      email: "",
      birthday: "",
      picture: "",
      idPicture: "",
    });
    setConfirmpass("");
    setIsClicked(false); // Reset the clicked state as well
  };

  const saveUser = async (event) => {
    event.preventDefault();
    setIsClicked(true);

    try {
      // Assuming idPicture is set in your data state
      const profilePictureFile = picture;
      const idPictureFile = idp;

      if (!profilePictureFile || !idPictureFile) {
        toast.error("Both profile picture and ID picture are required");
      }

      const profilePictureRef = ref(
        imageDb,
        "profiles/" + profilePictureFile.name
      );
      const idPictureRef = ref(imageDb, "profiles/" + idPictureFile.name);

      // Upload the profile picture
      await uploadBytes(profilePictureRef, profilePictureFile);
      // Retrieve the download URL of the profile picture
      const profilePictureURL = await getDownloadURL(profilePictureRef);

      // Upload the ID picture
      await uploadBytes(idPictureRef, idPictureFile);
      // Retrieve the download URL of the ID picture
      const idPictureURL = await getDownloadURL(idPictureRef);

      const updatedData = {
        ...Data, // Include existing data
        picture: profilePictureURL,
        idPicture: idPictureURL,
        submit: "true", // Set the 'submit' field to true
      };

      const response = await axios.put(
        `http://localhost:4000/seller/updateSeller/${uid}`,
        updatedData
      );

      toast.success(response.data.message);
      setStep("phone");
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error, show it to the user, or do any necessary cleanup
      // For example, you can show an error toast
      toast.error("Failed to save user data. Please try again later.");
    }
  };

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

  const handleId = (event) => {
    const file = event.target.files[0];

    setId(file);
  };

  const [picture, setPicture] = useState("");

  const handlePicture = (event) => {
    const file = event.target.files[0];

    setPicture(file);
  };

  const update_photo = async (event) => {
    event.preventDefault();
    setIsClicked(true);

    try {
      // Assuming idPicture is set in your data state
      const profilePictureFile = picture;
      const idPictureFile = idp;

      if (!profilePictureFile || !idPictureFile) {
        toast.error("Both profile picture and ID picture are required");
      }

      const profilePictureRef = ref(
        imageDb,
        "profiles/" + profilePictureFile.name
      );
      const idPictureRef = ref(imageDb, "profiles/" + idPictureFile.name);

      // Upload the profile picture
      await uploadBytes(profilePictureRef, profilePictureFile);
      // Retrieve the download URL of the profile picture
      const profilePictureURL = await getDownloadURL(profilePictureRef);

      // Upload the ID picture
      await uploadBytes(idPictureRef, idPictureFile);
      // Retrieve the download URL of the ID picture
      const idPictureURL = await getDownloadURL(idPictureRef);

      const updatedData = {
        approved: "false",
        picture: profilePictureURL,
        idPicture: idPictureURL,
      };

      const response = await axios.put(
        `http://localhost:4000/seller/updateSeller/${uid}`,
        updatedData
      );
      // Handle successful response

      toast.success("Uploaded succesfully please wait for Approval");
      setStep("phone");
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error, show it to the user, or do any necessary cleanup
      // For example, you can show an error toast
      toast.error("Failed to save user data. Please try again later.");
    }
  };

  return (
    <div className="sellerReg ">
      <Toaster />
      {step === "phone" && (
        <MDBContainer fluid className="HEY  vh-100">
          <MDBRow className="d-flex justify-content-center align-items-center vh-100">
            <MDBCol>
              <MDBCard
                className="my-4"
                style={{ width: "100%", height: "100%" }}
              >
                <MDBRow className="g-0 ">
                  <MDBCol md="6">
                    <MDBCardImage
                      style={{ height: "100%" }}
                      src={Bg}
                      alt="Sample photo"
                      className="rounded"
                      fluid
                    />
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBCardBody className="text-black d-flex flex-column justify-content-center align-items-center">
                      <MDBCardTitle className="mb-4 text-uppercase fw-bold text-center">
                        Create your Booklot Store Now!
                      </MDBCardTitle>
                      <MDBCardText className="mb-4 text-center">
                        Enter your Mobile Number to Start Selling.
                      </MDBCardText>
                      <MDBRow className="w-100">
                        <MDBCardText className="w-100">
                          {isClicked &&
                            phoneNumber &&
                            !isValidPhoneNumber(phoneNumber) && (
                              <div className="error-message text-center">
                                Invalid phone number.
                              </div>
                            )}
                          <div className="w-100 d-flex justify-content-center">
                            <Input
                              className={`input ${isFocused ? "focus" : ""} ${
                                isClicked && phoneNumber === "" ? "error" : ""
                              }`}
                              country="PH"
                              international
                              withCountryCallingCode
                              value={phoneNumber}
                              onChange={handlePhoneChange}
                              maxLength={16}
                              style={{ width: "80%" }}
                            />
                          </div>
                        </MDBCardText>
                      </MDBRow>
                      <div
                        id="recaptcha-container"
                        className="w-100 text-center"
                      ></div>
                      <div className="w-100 d-flex justify-content-center mt-3">
                        <button
                          type="submit"
                          className="verify-btn"
                          onClick={handlePhoneSubmit}
                          style={{ width: "80%" }}
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
        <MDBContainer fluid className="HEY  vh-100">
          <MDBRow className="d-flex justify-content-center align-items-center vh-100">
            <MDBCol>
              <MDBCard
                className="my-4"
                style={{ width: "100%", height: "100%" }}
              >
                <MDBRow className="g-0">
                  <MDBCol md="6">
                    <MDBCardImage
                      src={Bg}
                      alt="Sample photo"
                      className="rounded"
                      fluid
                    />
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                      <MDBCardTitle className="mb-4 text-uppercase fw-bold text-center">
                        Create your Booklot Store Now!
                      </MDBCardTitle>
                      <MDBCardText className="mb-4 text-center">
                        Enter your verification code.
                      </MDBCardText>
                      <MDBRow className="w-100">
                        <MDBCardText className="w-100">
                          <div className="error-message text-center">
                            {isClicked &&
                              verificationCode === "" &&
                              "Verification code is required."}
                          </div>
                          <div className="error-message text-center">
                            {isClicked &&
                              verificationCode.length !== 6 &&
                              "Verification code must be 6 digits."}
                          </div>
                          <div className="w-100 d-flex justify-content-center">
                            <input
                              className={`input ${isFocused ? "focus" : ""} ${
                                isClicked && verificationCode === ""
                                  ? "error"
                                  : ""
                              }`}
                              type="text"
                              value={verificationCode}
                              placeholder="6-PIN Code: ******"
                              onFocus={() => setIsFocused(true)}
                              onBlur={() => setIsFocused(false)}
                              onChange={(e) =>
                                setVerificationCode(e.target.value)
                              }
                              maxLength={6}
                              style={{ width: "70%", textAlign: "center" }}
                            />
                          </div>
                        </MDBCardText>
                      </MDBRow>
                      <div className="w-100 d-flex justify-content-center mt-3">
                        <button
                          className="code-btn"
                          type="submit"
                          onClick={handleVerificationSubmit}
                          style={{ width: "60%" }}
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
        <MDBContainer fluid className="HEY  h-800">
          <MDBRow className="d-flex justify-content-center align-items-center vh-100">
            <MDBCol>
              <MDBCard className="my-4">
                <MDBRow className="g-0">
                  <MDBCol md="6">
                    <MDBCardImage
                      src={Bg}
                      alt="Sample photo"
                      className="rounded"
                      fluid
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "left center",
                      }}
                    />
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBCardBody
                      className="text-black d-flex flex-column justify-content-center"
                      style={{ overflowY: "auto" }}
                    >
                      <MDBCardTitle className="mb-4 text-uppercase fw-bold text-center">
                        SELLER REGISTRATION
                      </MDBCardTitle>
                      <MDBCardText className="mb-4 text-center">
                        Please fill out all the required fields to complete the
                        registration process.
                      </MDBCardText>

                      <MDBRow>
                        <MDBCol md="6">
                          {isClicked && Data.firstname === "" && (
                            <div className="error-message">
                              First name is required.
                            </div>
                          )}

                          <input
                            className={`input ${isFocused ? "focus" : ""} ${
                              isClicked && Data.firstname === "" ? "error" : ""
                            }`}
                            placeholder="First Name"
                            name="firstname"
                            id="form1"
                            type="text"
                            value={Data.firstname}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onChange={handleFormChanges}
                          />
                        </MDBCol>

                        <MDBCol md="6">
                          {isClicked && Data.lastname === "" && (
                            <div className="error-message">
                              Last name is required.
                            </div>
                          )}
                          <input
                            className={`input ${isFocused ? "focus" : ""} ${
                              isClicked && Data.lastname === "" ? "error" : ""
                            }`}
                            placeholder="Last Name"
                            name="lastname"
                            id="form2"
                            type="text"
                            value={Data.lastname}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onChange={handleFormChanges}
                          />
                        </MDBCol>
                      </MDBRow>
                      {isClicked && Data.birthday === "" && (
                        <div className="error-message">
                          Birthday is required.
                        </div>
                      )}

                      <input
                        className={`input ${isFocused ? "focus" : ""} ${
                          isClicked && Data.birthday === "" ? "error" : ""
                        }`}
                        placeholder="Birthday"
                        name="birthday"
                        id="form3"
                        type="date"
                        value={Data.birthday}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChange={handleFormChanges}
                      />
                      {isClicked && Data.shopname === "" && (
                        <div className="error-message">
                          Shop Name is required.
                        </div>
                      )}

                      <input
                        className={`input ${isFocused ? "focus" : ""} ${
                          isClicked && Data.shopname === "" ? "error" : ""
                        }`}
                        placeholder="Shop Name"
                        name="shopname"
                        id="form4"
                        type="text"
                        value={Data.shopname}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChange={handleFormChanges}
                      />
                      {isClicked && Data.email === "" && (
                        <div className="error-message">Email is required.</div>
                      )}

                      <input
                        className={`input ${isFocused ? "focus" : ""} ${
                          isClicked && Data.email === "" ? "error" : ""
                        }`}
                        placeholder="Email"
                        name="email"
                        id="form5"
                        type="email"
                        value={Data.email}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChange={handleFormChanges}
                      />
                      {isClicked && Data.password === "" && (
                        <div className="error-message">
                          Password is required.
                        </div>
                      )}

                      {isClicked &&
                        Data.password !== "" &&
                        Data.password.length < 8 && (
                          <div className="error-message">
                            Password must be at least 8 characters long.
                          </div>
                        )}

                      {isClicked &&
                        Data.password !== "" &&
                        confirmPass !== "" &&
                        Data.password !== confirmPass && (
                          <div className="error-message">
                            Passwords do not match.
                          </div>
                        )}

                      <input
                        className={`input ${isFocused ? "focus" : ""} ${
                          isClicked &&
                          (Data.password === "" || Data.password.length < 8)
                            ? "error"
                            : ""
                        }`}
                        placeholder="Password"
                        name="password"
                        id="form6"
                        type="password"
                        value={Data.password}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChange={handleFormChanges}
                      />

                      {isClicked && confirmPass === "" && (
                        <div className="error-message">
                          Confirm your password.
                        </div>
                      )}

                      <input
                        className={`input ${isFocused ? "focus" : ""} ${
                          isClicked && confirmPass === "" ? "error" : ""
                        }`}
                        placeholder="Confirm Password"
                        name="confirmPass"
                        id="form7"
                        type="password"
                        value={confirmPass}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChange={handleConfirmPassChange}
                      />

                      <div className="d-flex justify-content-end pt-3">
                        <button
                          className="abutton mb-3"
                          type="button"
                          onClick={resetForm}
                        >
                          RESET
                        </button>
                        <button
                          className="abutton mb-3"
                          type="button"
                          onClick={uploadPhoto}
                        >
                          PROCEED
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

      {step == "Photo" && (
        <div>
          <MDBContainer fluid className="HEY vh-100">
            <MDBRow className="d-flex justify-content-center align-items-center vh-100">
              <MDBCol>
                <MDBCard className="my-4">
                  <MDBRow>
                    <MDBCol md="">
                      <MDBCardImage
                        position="left"
                        src={Bg}
                        alt="Sample photo"
                        className="rounded"
                        fluid
                        style={{
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "left center",
                        }}
                      />
                    </MDBCol>

                    <MDBCol md="6">
                      <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                        <MDBCardTitle className="mb-4 text-uppercase fw-bold text-center">
                          SELLER REGISTRATION
                        </MDBCardTitle>
                        <MDBCardText className="mb-4 text-center">
                          Please fill out all the required fields to complete
                          the registration process.
                        </MDBCardText>

                        <MDBCardText>
                          Upload your Profile Picture here:
                        </MDBCardText>
                        {isClicked && !picture && (
                          <div className="error-message">
                            Profile picture is required.
                          </div>
                        )}
                        <MDBInput
                          wrapperClass={`input mb-4 ${
                            isClicked && !picture ? "error" : ""
                          }`}
                          size="lg"
                          id="form3"
                          type="file"
                          accept="image/*"
                          capture="filesystem"
                          name="picture"
                          onChange={handlePicture}
                        />

                        <MDBCardText>Upload your Valid ID here: </MDBCardText>
                        {isClicked && !idp && (
                          <div className="error-message">
                            ID picture is required.
                          </div>
                        )}
                        <MDBInput
                          wrapperClass={`input mb-4 ${
                            isClicked && !idp ? "error" : ""
                          }`}
                          size="lg"
                          id="form4"
                          type="file"
                          accept="image/*"
                          capture="filesystem"
                          name="idPicture"
                          onChange={handleId}
                        />

                        <div className="d-flex justify-content-end pt-3">
                          <button className="abutton mb-3" onClick={resetForm}>
                            RESET
                          </button>
                          <button className="abutton mb-3" onClick={saveUser}>
                            PROCEED
                          </button>
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
            className="d-flex justify-content-center align-items-center flex-column text-center"
          >
            <i className="fas fa-hourglass-half icon"></i>

            <h1 className="h mt-3">We’re evaluating your profile.</h1>
            <p>
              In order to maintain our community standards, each profile is
              carefully reviewed before approval.
            </p>
            <button className="ok-button mt-4" onClick={() => setStep("phone")}>
              OK
            </button>
          </MDBRow>
        </MDBContainer>
      )}

      {step == "unapproved" && (
        <div>
          <MDBContainer fluid className="HEY vh-100">
          <MDBRow className="d-flex justify-content-center align-items-center vh-100">
              <MDBCol>
                <MDBCard className="my-4">
                  <MDBRow>
                    <MDBCol md="">
                      <MDBCardImage
                        position="left"
                        src={Bg}
                        alt="Sample photo"
                        className="rounded"
                        fluid
                        style={{
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "left center",
                        }}
                      />
                    </MDBCol>

                    <MDBCol md="6">
                      <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                      <MDBCardTitle className="mb-4 text-uppercase fw-bold text-center">
                          UPLOAD PHOTO
                        </MDBCardTitle>
                        <MDBCardText className="mb-4 text-center">
                          Please upload another photo because your ID and/or
                          photo you provided were invalid.
                        </MDBCardText>

                        <MDBCardText>Upload your Picture here: </MDBCardText>
                        {isClicked && !picture && (
                          <div className="error-message">
                            Profile picture is required.
                          </div>
                        )}
                        <MDBInput
                          wrapperClass={`input mb-4 ${
                            isClicked && !picture ? "error" : ""
                          }`}
                          size="lg"
                          id="form3"
                          type="file"
                          accept="image/*"
                          capture="filesystem"
                          name="picture"
                          onChange={handlePicture}
                        />

                        <MDBCardText>Upload your Valid ID here: </MDBCardText>
                        {isClicked && !idp && (
                          <div className="error-message">
                            ID picture is required.
                          </div>
                        )}
                        <MDBInput
                          wrapperClass={`input mb-4 ${
                            isClicked && !idp ? "error" : ""
                          }`}
                          size="lg"
                          id="form4"
                          type="file"
                          accept="image/*"
                          capture="filesystem"
                          name="idPicture"
                          onChange={handleId}
                        />

                        <div className="d-flex justify-content-end pt-3">
                          <button className="abutton mb-3" onClick={resetForm}>
                            RESET
                          </button>
                          <button
                            className="abutton mb-3"
                            onClick={update_photo}
                          >
                            PROCEED
                          </button>
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
    </div>
  );
};

export default PhoneVerification;
