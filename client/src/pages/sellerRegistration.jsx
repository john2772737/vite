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
import Select from 'react-select';

import "../css/sellerRegistration.css";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import backgroundimage from "../components/images/booklot_bg.png";

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
import { useFirebase } from "../utils/context";

const validCities = [
  "MANILA",
  "QUEZON",
  "CEBU",
  "DAVAO",
  "ZAMBOANGA",
  "CANDABA",
  "GUAGUA",
  "ABUCAY",
  "BAGAC",
  "DINALUPIHAN",
  "HERMOSA",
  "LIMAY",
  "MARIVELES",
  "ORANI",
  "ORION",
  "PILAR",
  "SAMAL",
  "ANGELES",
  "APALIT",
  "ARAYAT",
  "BACOLOR",
  "FLORIDABLANCA",
  "GUAGUA",
  "MABALACAT",
  "MACABEBE",
  "MAGALANG",
  "MASANTOL",
  "MEXICO",
  "MINALIN",
  "PORAC",
  "SAN FERNANDO",
  "SAN LUIS",
  "SAN SIMON",
  "SANTA ANA",
  "SANTA RITA",
  "SANTO TOMAS",
  "SASMUAN",
  "ANAO",
  "BAMBAN",
  "CAMILING",
  "CAPAS",
  "CONCEPCION",
  "GERONA",
  "LA PAZ",
  "MAYANTOC",
  "MONCADA",
  "PANIQUI",
  "PURA",
  "RAMOS",
  "SAN CLEMENTE",
  "SAN MANUEL",
  "SANTA IGNACIA",
  "TARLAC CITY",
  "VICTORIA",
  "ALAMINOS",
  "ALCALA",
  "ANDA",
  "ASINGAN",
  "BALUNGAO",
  "BANI",
  "BASISTA",
  "BAYAMBANG",
  "BINALONAN",
  "BINMALEY",
  "BOLINAO",
  "BUGALLON",
  "BURGOS",
  "CALASIAO",
  "DAGUPAN",
  "DASOL",
  "INFANTA",
  "LABRADOR",
  "LUBAO",
  "LINGAYEN",
  "MABINI",
  "MALASIQUI",
  "MANAOAG",
  "MANGALDAN",
  "MANGATAREM",
  "MAPANDAN",
  "NATIVIDAD",
  "POZORRUBIO",
  "ROSALES",
  "SAN CARLOS",
  "SAN FABIAN",
  "SAN JACINTO",
  "SAN MANUEL",
  "SAN NICOLAS",
  "SAN QUINTIN",
  "SANTA BARBARA",
  "SANTA MARIA",
  "SANTO TOMAS",
  "SISON",
  "SUAL",
  "TAYUG",
  "UMINGAN",
  "URBIZTONDO",
  "VILLASIS",
  "LAOAC",
  "LUPAO",
  "NAMPICUAN",
  "QUEZON",
  "RIZAL",
  "SAN LEONARDO",
  "SANTO DOMINGO",
  "TALAVERA",
  "CABANATUAN",
  "GAPAN",
  "PALAYAN",
];
const validCitiesSorted = validCities.sort((a, b) => a.localeCompare(b));

const validProvinces = [
  "ABRA",
  "AGUSAN DEL NORTE",
  "AGUSAN DEL SUR",
  "AKLAN",
  "ALBAY",
  "ANTIQUE",
  "APAYAO",
  "AURORA",
  "BASILAN",
  "BATAAN",
  "BATANES",
  "BATANGAS",
  "BENGUET",
  "BILIRAN",
  "BOHOL",
  "BUKIDNON",
  "BULACAN",
  "CAGAYAN",
  "CAMARINES NORTE",
  "CAMARINES SUR",
  "CAMIGUIN",
  "CAPIZ",
  "CATANDUANES",
  "CAVITE",
  "CEBU",
  "COMPOSTELA VALLEY",
  "COTABATO",
  "DAVAO DEL NORTE",
  "DAVAO DEL SUR",
  "DAVAO OCCIDENTAL",
  "DAVAO ORIENTAL",
  "DINAGAT ISLANDS",
  "EASTERN SAMAR",
  "GUIMARAS",
  "IFUGAO",
  "ILOCOS NORTE",
  "ILOCOS SUR",
  "ILOILO",
  "ISABELA",
  "KALINGA",
  "LA UNION",
  "LAGUNA",
  "LANAO DEL NORTE",
  "LANAO DEL SUR",
  "LEYTE",
  "MAGUINDANAO",
  "MARINDUQUE",
  "MASBATE",
  "MISAMIS OCCIDENTAL",
  "MISAMIS ORIENTAL",
  "MOUNTAIN PROVINCE",
  "NEGROS OCCIDENTAL",
  "NEGROS ORIENTAL",
  "NORTHERN SAMAR",
  "NUEVA ECIJA",
  "NUEVA VIZCAYA",
  "OCCIDENTAL MINDORO",
  "ORIENTAL MINDORO",
  "PALAWAN",
  "PAMPANGA",
  "PANGASINAN",
  "QUEZON",
  "QUIRINO",
  "RIZAL",
  "ROMBLON",
  "SAMAR",
  "SARANGANI",
  "SIQUIJOR",
  "SORSOGON",
  "SOUTH COTABATO",
  "SOUTHERN LEYTE",
  "SULTAN KUDARAT",
  "SULU",
  "SURIGAO DEL NORTE",
  "SURIGAO DEL SUR",
  "TARLAC",
  "TAWI-TAWI",
  "ZAMBALES",
  "ZAMBOANGA DEL NORTE",
  "ZAMBOANGA DEL SUR",
  "ZAMBOANGA SIBUGAY",
];

const PhoneVerification = () => {
  const [step, setStep] = useState("phone"); // 'phone' or 'verification'
  const [phoneNumber, setPhoneNumber] = useState("+63");
  const [verificationCode, setVerificationCode] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useFirebase();

  // const sample = () => {
  //   setStep("form");
  // };

  useEffect(() => {
    const checkApproval = async () => {
      if (currentUser && currentUser !== null) {
        const exists = await axios.get(
          `http://localhost:4000/seller/findPhoneNumber/${phoneNumber}`
        );
        const seller = exists.data.seller;

        if (seller.approved === "true") {
          navigate("/seller/dashboard");
        }
      }
    };

    checkApproval();
  }, [currentUser, navigate, phoneNumber]);
  
  const handleCitySelect = (selectedOption) => {
    setData({ ...Data, city: selectedOption.value });
  };

  const handleProvinceSelect = (selectedOption) => {
    setData({ ...Data, state: selectedOption.value });
  };

  const [Data, setData] = useState({
    firebaseuid: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    province: "",
    zip: "",
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

    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("Invalid phone number");
      return;
    }

    try {
      if (!document.getElementById("recaptcha-container")) {
        const recaptchaContainer = document.createElement("div");
        recaptchaContainer.id = "recaptcha-container";
        document.body.appendChild(recaptchaContainer);
      }

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

      if (seller.submit === false) {
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
        toast.error("your photo was not approved.");

        setStep("unapproved");
        return;
      }

      setStep("phone");
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
    if (
      !Data.firstname ||
      !Data.lastname ||
      !Data.city ||
      !Data.state ||
      !Data.zip ||
      !Data.birthday ||
      !Data.shopname ||
      !Data.email ||
      !Data.password ||
      !confirmPass
    ) {
      toast.error("Please fill out all fields.");
      return;
    }

    const nameRegex = /^[A-Z][a-zA-Z\s]*$/;
    if (!nameRegex.test(Data.firstname) || !nameRegex.test(Data.lastname)) {
      toast.error(
        "Firstname and Lastname must contain only letters and start with a capital letter."
      );
      return;
    }

    // Validate city and state (province) for the Philippines
    const capitalizedCity = Data.city.toUpperCase();
    if (!validCities.includes(capitalizedCity) || /\d/.test(capitalizedCity)) {
      toast.error(
        "Invalid city. Please enter a valid city in the Philippines without numbers in all capital letters."
      );
      return;
    }

    const capitalizedState = Data.state.toUpperCase();
    if (
      !validProvinces.includes(capitalizedState) ||
      /\d/.test(capitalizedState)
    ) {
      toast.error(
        "Invalid state. Please enter a valid state (province) in the Philippines without numbers in all capital letters."
      );
      return;
    }
    const zipCodeRegex = /^\d+$/;
    if (!zipCodeRegex.test(Data.zip)) {
      toast.error("Invalid zip code.");
      return;
    }

    // Validate age (should be at least 18 years old)
    const today = new Date();
    const birthdayDate = new Date(Data.birthday);
    const ageDifference = today.getFullYear() - birthdayDate.getFullYear();
    const isAdult =
      ageDifference > 18 ||
      (ageDifference === 18 && today.getMonth() > birthdayDate.getMonth()) ||
      (ageDifference === 18 &&
        today.getMonth() === birthdayDate.getMonth() &&
        today.getDate() >= birthdayDate.getDate());

    if (!isAdult) {
      toast.error("You must be at least 18 years old.");
      return;
    }

    // Validate email format to include @gmail.com
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(Data.email)) {
      toast.error(
        "Email must be a valid Gmail address. (e.g., example@gmail.com)"
      );
      return;
    }
    // Validate password to include at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(Data.password)) {
      toast.error(
        "Password must contain at least one letter and one number. Password must be at least 8 characters long."
      );
      return;
    }

    if (Data.password !== confirmPass) {
      toast.error("Password do not Match");
      return;
    }

    setStep("Photo");
  };

  const resetForm = () => {
    setData({
      firstname: "",
      lastname: "",
      city: "",
      zip: "",
      state: "",
      shopname: "",
      password: "",
      email: "",
      birthday: "",
      picture: "",
      idPicture: "",
    });
    setConfirmpass("");
  };

  const saveUser = async (event) => {
    event.preventDefault();
    try {
      const profilePictureFile = picture; // Assuming 'picture' is defined in your state
      const idPictureFile = idp; // Assuming 'idp' is defined in your state

      if (!profilePictureFile || !idPictureFile) {
        toast.error("Both profile picture and ID picture are required.");
        return; // Exit the function if files are missing
      }

      const profilePictureRef = ref(
        imageDb,
        "profiles/" + profilePictureFile.name
      );
      const idPictureRef = ref(imageDb, "profiles/" + idPictureFile.name);

      // Use toast.promise to handle the upload process
      const [profilePictureURL, idPictureURL] = await toast.promise(
        Promise.all([
          uploadBytes(profilePictureRef, profilePictureFile).then(() =>
            getDownloadURL(profilePictureRef)
          ),
          uploadBytes(idPictureRef, idPictureFile).then(() =>
            getDownloadURL(idPictureRef)
          ),
        ]),
        {
          loading: "Saving...",
          success: "User data saved successfully!",
          error: "Failed to save user data. Please try again later.",
        }
      );

      const address = `${Data.city}, ${Data.state}, ${Data.zip}`;
      const updatedData = {
        ...Data, // Include existing data
        address: address,
        picture: profilePictureURL,
        idPicture: idPictureURL,
        submit: "true", // Set the 'submit' field to true
      };

      // Perform the axios call without toast.promise
      await axios.put(
        `http://localhost:4000/seller/updateSeller/${uid}`,
        updatedData
      );

      setStep("phone");
    } catch (error) {
      console.error("Error:", error.message);
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
    try {
      // Assuming 'picture' and 'idp' are set in your data state
      const profilePictureFile = picture;
      const idPictureFile = idp;

      if (!profilePictureFile || !idPictureFile) {
        toast.error("Both profile picture and ID picture are required");
        return; // Exit the function if files are missing
      }

      const profilePictureRef = ref(
        imageDb,
        "profiles/" + profilePictureFile.name
      );
      const idPictureRef = ref(imageDb, "profiles/" + idPictureFile.name);

      // Use toast.promise to handle the upload process
      const [profilePictureURL, idPictureURL] = await toast.promise(
        Promise.all([
          uploadBytes(profilePictureRef, profilePictureFile).then(() =>
            getDownloadURL(profilePictureRef)
          ),
          uploadBytes(idPictureRef, idPictureFile).then(() =>
            getDownloadURL(idPictureRef)
          ),
        ]),
        {
          loading: "Saving...",
          success: "Data saved successfully!",
          error: "Failed to save user data. Please try again later.",
        }
      );

      const updatedData = {
        approved: "false",
        picture: profilePictureURL,
        idPicture: idPictureURL,
      };

      // Perform the axios call without toast.promise
      await axios.put(
        `http://localhost:4000/seller/updateSeller/${uid}`,
        updatedData
      );

      setStep("phone");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to save user data. Please try again later.");
    }
  };

  return (
    <div>
      <Toaster />
      <div className="sellerReg ">
        {step === "phone" && (
          <div
            className="background-container"
            style={{
              position: "relative",
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="background-image"
              style={{
                backgroundImage: `url(${backgroundimage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
                filter: "blur(5px)", // Adjust the blur intensity here
                position: "absolute",
                zIndex: "-1",
              }}
            ></div>
            <MDBContainer
              fluid
              className="d-flex justify-content-center align-items-center"
            >
              <MDBCard className="my-4">
                <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                  <MDBCardTitle className="mb-4 text-uppercase fw-bold">
                    Create your Booklot Store Now!
                  </MDBCardTitle>
                  <MDBCardText className="mb-4">
                    Enter your Mobile Number to Start Selling.
                  </MDBCardText>
                  <MDBRow className="justify-content-center">
                    <MDBCardText>
                      <Input
                        className="input text-center"
                        country="PH"
                        international
                        withCountryCallingCode
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        maxLength={16}
                      />
                    </MDBCardText>
                  </MDBRow>

                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="verify-btn"
                      onClick={handlePhoneSubmit}
                    >
                      Verify with SMS
                    </button>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          </div>
        )}

        {step === "verification" && (
          <div
            className="background-container"
            style={{
              position: "relative",
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="background-image"
              style={{
                backgroundImage: `url(${backgroundimage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
                filter: "blur(5px)", // Adjust the blur intensity here
                position: "absolute",
                zIndex: "-1",
              }}
            ></div>
            <MDBContainer
              fluid
              className="d-flex justify-content-center align-items-center"
            >
              <MDBCard className="my-4">
                <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                  <MDBCardTitle className="mb-2 text-uppercase fw-bold">
                    Create your Booklot Store Now!
                  </MDBCardTitle>
                  <MDBCardText>Enter your verification code.</MDBCardText>
                  <MDBRow>
                    <MDBCardText>
                      Verification Code:
                      <MDBInput
                        className="code-input text-center"
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
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
              </MDBCard>
            </MDBContainer>
          </div>
        )}

        {step === "form" && (
          <div
            className="background-container"
            style={{
              position: "relative",
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="background-image"
              style={{
                backgroundImage: `url(${backgroundimage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
                filter: "blur(5px)", // Adjust the blur intensity here
                position: "absolute",
                zIndex: "-1",
              }}
            ></div>
            <MDBContainer
              fluid
              className="HEY"
              size="sm"
              style={{ maxWidth: "600px" }}
            >
              <MDBRow className="d-flex justify-content-center align-items-center">
                <MDBCol>
                  <MDBCard className="my-4">
                    <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                      <MDBCardTitle className="mb-4 text-uppercase fw-bold">
                        SELLER REGISTRATION
                      </MDBCardTitle>
                      <MDBCardText>
                        Please fill out all the required fields to complete the
                        registration process.
                      </MDBCardText>
                      <MDBRow>
                        <MDBCol>
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
                        <MDBCol>
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

                      <Select
                        options={validCitiesSorted.map((city) => ({
                          value: city,
                          label: city,
                        }))}
                        onChange={handleCitySelect}
                        className="mb-4"
                        placeholder="Choose your city"
                      />

                      <Select
                        options={validProvinces.map((province) => ({
                          value: province,
                          label: province,
                        }))}
                        onChange={handleProvinceSelect}
                        className="mb-4"
                        placeholder="Choose your province"
                      />

                      <MDBInput
                        wrapperClass="mb-4"
                        label="ZIP / Postal code"
                        size="lg"
                        id="zip"
                        type="text"
                        value={Data.zip}
                        onChange={handleFormChanges}
                        name="zip"
                      />

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
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        )}

        {step === "Photo" && (
          <div
            className="background-container"
            style={{
              position: "relative",
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="background-image"
              style={{
                backgroundImage: `url(${backgroundimage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
                filter: "blur(5px)", // Adjust the blur intensity here
                position: "absolute",
                zIndex: "-1",
              }}
            ></div>
            <MDBContainer fluid className="HEY" size="sm">
              <MDBRow className="d-flex justify-content-center align-items-center">
                <MDBCol md="6">
                  <MDBCard className="my-4">
                    <MDBRow>
                      <MDBCol>
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
                          <MDBCardText>
                            We accept any type of ID but it must contain a
                            Picture of yourself, Full Name, Address, and
                            Birthday.
                          </MDBCardText>
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
          <div
            className="background-container"
            style={{
              position: "relative",
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="background-image"
              style={{
                backgroundImage: `url(${backgroundimage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
                filter: "blur(5px)", // Adjust the blur intensity here
                position: "absolute",
                zIndex: "-1",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
              }}
            >
              <MDBContainer
                fluid
                className="wait-page-container my-4 d-flex flex-column align-items-center justify-content-center"
                style={{
                  backgroundColor: "white",
                  maxWidth: "500px", // Adjust the max-width here
                  color: "black",
                  borderRadius: "10px",
                  width: "100%",
                  padding: "20px",
                }}
              >
                <MDBCol md="8">
                  <MDBRow id="wait-content" className="wait-message">
                    <i className="fas fa-hourglass-half icon"></i>

                    <h1 className="h mt-3">We’re evaluating your profile.</h1>
                    <p>
                      In order to maintain our community standards, each profile
                      is carefully reviewed before approval.
                    </p>
                  </MDBRow>
                  <div className="button-container">
                    <button
                      className="ok-button mt-4"
                      onClick={() => setStep("phone")}
                    >
                      OK
                    </button>
                  </div>
                </MDBCol>
              </MDBContainer>
            </div>
          </div>
        )}

        {step === "unapproved" && (
          <div
            className="background-container"
            style={{
              position: "relative",
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="background-image"
              style={{
                backgroundImage: `url(${backgroundimage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
                filter: "blur(5px)", // Adjust the blur intensity here
                position: "absolute",
                zIndex: "-1",
              }}
            ></div>
            <MDBContainer fluid className="HEY" size="sm">
              <MDBRow className="d-flex justify-content-center align-items-center">
                <MDBCol md="6">
                  <MDBCard className="my-4">
                    <MDBRow>
                      <MDBCol>
                        <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                          <MDBCardTitle className="mb-4 text-uppercase fw-bold">
                            Upload Photo
                          </MDBCardTitle>
                          <MDBCardText>
                            Please upload another photo because your ID and
                            photo you provided are invalid.
                          </MDBCardText>

                          <MDBCardText>Upload your Picture here: </MDBCardText>
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
                          <MDBCardText>
                            We accept any type of ID but it must contain a
                            Picture of yourself, Full Name, Address, and
                            Birthday.
                          </MDBCardText>

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

        <div></div>
      </div>
    </div>
  );
};

export default PhoneVerification;
