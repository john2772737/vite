import { useState, useEffect } from "react";
import backgroundImage from "../components/images/booklot_bg.png";
import "../css/userLogin.css";
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

import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

function App() {
  const navigate = useNavigate();
  const [step, setStep] = useState("login");
  const [isFocused, setIsFocused] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [Password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  // Assuming you have a state variable to track whether the password is incorrect
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const [code, setcode] = useState("");

  const [Data, setData] = useState({
    uid: "",
    fullname: "",
    email: "",
    photo: "",
  });

  const initialFormData = {
    uid: "",
    fullname: "",
    username: "",
    email: "",
    password: "",
    birthday: "",
    phoneNumber: "",
    photo: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handlepasswordChanges = (event) => {
    const { name, value } = event.target;
    // Update the form data state with the new value
    setPassword({
      ...Password,
      [name]: value,
    });
  };
  const handleinputChanges = (event) => {
    const { name, value } = event.target;
    // Update the form data state with the new value
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/user/createUser",
        formData
      );
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 409) {
        toast.error(error.response.data.message); // Display the error message from the backend
      }
    }
  };

  const userLogin = () => {
    setStep("login");
  };

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      toast.success("Successfully Logged In");
      signInWithProvider(user);
      toast.success("Successfully Logged In");
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        // You can provide the user with options to resolve the situation,
        // such as linking their Facebook account with their existing account.
        // For example, you can guide them to a page where they can choose
        // to link their accounts or sign in with their existing account directly.
        // You may also want to provide a way for users to contact support for assistance.
        toast.error(
          "Failed to Log In.The email of this account is already registered to this website."
        );

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

      signInWithProvider(user);
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithProvider = async (user) => {
    try {
      const checkUID = await axios.get(
        `http://localhost:4000/user/checkUid/${user.uid}`
      );

      if (checkUID.data == true) {
        navigate("/user");
        return;
      }

      setStep("setPassword");

      setFormData({
        uid: user.uid,
        fullname: user.displayName,
        email: user.email,
        username: "",
        photo: user.photoURL,
        birthday: "",
        phoneNumber: "",
      });
      // You can redirect the user or perform other actions based on the response
    } catch (error) {
      // Handle errors
      console.error("Error signing in:", error);
      // You can display an error message to the user or perform other actions based on the error
    }
  };

  const userRegistration = () => {
    setStep("signup");
  };

  const saveDatabase = async () => {
    setIsClicked(true);

    if (Password.password === "") {
      return;
    }
    if (Password.confirmPassword === "") {
      return;
    }
    if (Password.password.length < 8) {
      return;
    }

    if (Password.password !== Password.confirmPassword) {
      return;
    }

    const modifiedUser = {
      uid: formData.uid,
      fullname: formData.fullname,
      photo: formData.photo,
      email: formData.email,
      password: formData.password,

      // Assuming 'displayName' is the property containing the display name
    };

    // Make a POST request to your backend endpoint
    const response = await axios.post(
      "http://localhost:4000/user/createUserProvider",
      formData
    );
    toast.success("Successfully Logged In");
    navigate("/user");
  };

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleLoginChanges = (event) => {
    const { name, value } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
    console.log(login);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsClicked(true);

    if (login.email === "" || login.password === "") {
      document.querySelectorAll(".input").forEach((input) => {
        input.classList.add("error");
      });
      return;
    }

    const email = await axios.get(
      `http://localhost:4000/user/checkEmail/${login.email}`
    );

    try {
      console.log(email.data.exists);

      if (!email.data.exists) {
        toast.error(email.data.message);
        return;
      }

      const dbpass = email.data.user.password;

      if (login.password !== dbpass) {
        document.querySelector(".password-input").classList.add("error");

        toast.error("Wrong Password");
        setIncorrectPassword(true); // Set state to indicate incorrect password

        setIsClicked(false);

        return;
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }

    toast.success(email.data.message);

    setTimeout(() => {
      navigate("/user");
    }, 1500);
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    setIsClicked(true);

    try {
      // Validation for full name field
      if (!formData.fullname) {
        return;
      }
      const lettersOnly = /^[a-zA-Z\s]+$/;
      if (!lettersOnly.test(formData.fullname)) {
        toast.error("Full name must contain only letters.");
        return;
      }

      // Validation for username field
      if (!formData.username) {
        toast.error("Username is required");
        return;
      }

      // Validation for email field
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
        toast.error("Email address is required.");
        return;
      }
      if (
        !emailRegex.test(formData.email.toLowerCase()) ||
        !formData.email.toLowerCase().endsWith("gmail.com")
      ) {
        toast.error("Please enter a valid email address.");
        return;
      }

      // Validation for password field
      if (!formData.password) {
        toast.error("Password is required.");
        return;
      }
      if (formData.password.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return;
      }

      // // Check if username is registered or similar to existing usernames
      // const usernameResponse = await axios.get(
      //   `http://localhost:4000/user/checkUsername/${formData.username}`
      // );
      // if (usernameResponse.data.exists) {
      //   // Username is already taken
      //   toast.error("Username is already taken");
      //   return;
      // }
      // // Username is available
      // // You may also want to implement logic to check for similarity with existing usernames

      // Check if email is already registered

      const emailResponse = await axios.get(
        `http://localhost:4000/user/checkEmail/${formData.email}`
      );
      if (emailResponse.data.exists) {
        // Email is already registered
        toast.error("Email already registered.");
        return;
      }

      // If all validations pass, proceed to the next step
      setStep("verifyEmail");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCode = (e) => {
    const inputValue = e.target.value;
    // Regular expression to allow only numbers and limit to 4 digits
    const onlyNumbers = /^[0-9]*$/;
    if (onlyNumbers.test(inputValue) && inputValue.length <= 4) {
      setcode(parseInt(inputValue));
    }
  };
  const [verificationCode, setVerificationCode] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const [uid, setuid] = useState("");

  const getCode = async (e) => {
    e.preventDefault();
    try {
      toast.promise(
        axios.post(
          `http://localhost:4000/user/sendVerification/${formData.email}`
        ),
        {
          loading: "Sending verification code...",
          success: (response) => {
            const verificationCode = response.data.verificationCode;
            setVerificationCode(verificationCode);
            const uid = response.data.uid;
            setuid(uid);
            setButtonDisabled(true);
            startTimer();

            return response.data.message;
          },
          error: <b>Could not send verification code.</b>,
        }
      );
      setTimeout(() => {
        setButtonDisabled(false);
      }, 60000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while sending verification code.");
    }
  };
  const startTimer = () => {
    setRemainingTime((prevTime) => {
      if (prevTime === 0) {
        setButtonDisabled(false); // Enable the button
        return 60; // Reset remainingTime to 60
      } else {
        return prevTime - 1; // Decrement remainingTime every second
      }
    });
  };
  useEffect(() => {
    const timer = setInterval(() => {
      startTimer();
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array ensures that effect runs only once on component mount

  const handleVerificationCode = (e) => {
    e.preventDefault();
    setIsClicked(true);

    console.log(verificationCode);

    if (verificationCode === "") {
      toast.error("Please input a verification code");
      return;
    }
    if (verificationCode !== code) {
      toast.error("Wrong Verification Code");
      return;
    }
    toast.success("Successfully Registered, Please Log In");

    formData.uid = uid;

    handleSubmit();

    setTimeout(() => {
      setStep("login");
      setFormData(initialFormData);
    }, 1500);
  };

  return (
    <div>
      {step === "login" && (
        <div>
          <Toaster />
          <MDBContainer
            fluid
            className="p-4 background-radial-gradient overflow-hidden vh-100"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
          >
            <MDBRow>
              {/* <MDBCol
                md="6"
                className="text-center text-md-start d-flex flex-column justify-content-center"
              >
                <h1
                  className="my-5 display-3 fw-bold ls-tight px-3"
                  style={{
                    color: "Black",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
                  }}
                >
                  BOOKLOT <br />
                  <span style={{ color: "red" }}>
                    From Cart to Couch, your Book awaits...
                  </span>
                </h1>

                <p
                  className="px-3"
                  style={{
                    color: "black",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  Welcome back to BookLot! Dive into our vast collection of
                  books and find your next literary adventure. Whether you're
                  into thrillers, romance, fantasy, or non-fiction, we have
                  something for everyone. Start exploring now and let your
                  imagination soar!
                </p>
              </MDBCol> */}

              <MDBCol
                md="6"
                className="position-relative"
                style={{ opacity: "1", fontFamily: "League Spartan" }}
              >
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

                    <div className="error-message">
                      {isClicked && login.email === "" && "Email is required."}
                    </div>

                    <input
                      className={`input ${isFocused ? "focus" : ""} `}
                      type="text"
                      placeholder="Email"
                      name="email" // Make sure the name attribute corresponds to the state key
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onChange={handleLoginChanges}
                    />
                    <div className="error-message">
                      {isClicked &&
                        login.password === "" &&
                        "Password is required."}
                      {incorrectPassword && "Incorrect password."}
                    </div>
                    <input
                      className={`input password-input ${
                        isFocused ? "focus" : ""
                      } ${login.password !== "" && "wrong-password"}`}
                      type="password"
                      placeholder="Password"
                      name="password"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onChange={handleLoginChanges}
                    />

                    <button className="button  mb-3" onClick={handleLogin}>
                      SIGN IN
                    </button>

                    <div className="d-flex justify-content-center mb-2">
                      <Link to="/forgotPassword">Forgot Password?</Link>
                    </div>

                    <div className="or-container mb-3">
                      <hr className="or-divider"></hr>
                      <h1>OR</h1>
                      <hr className="or-divider"></hr>
                    </div>

                    <button className="button1 mb-3" onClick={userRegistration}>
                      CREATE AN ACCOUNT
                    </button>

                    <div className="text-center">
                      <p>SIGN IN WITH</p>

                      <MDBBtn
                        tag="a"
                        color="none"
                        className="mx-3"
                        style={{
                          color: "black",
                          transition: "color 0.3s", // Adding transition for smooth color change
                        }}
                        onMouseOver={(e) => {
                          e.target.style.color = "red";
                        }} // Change color on hover
                        onMouseOut={(e) => {
                          e.target.style.color = "black";
                        }} // Revert back to original color
                        onClick={signInWithFacebook}
                      >
                        <MDBIcon fab icon="facebook-f" size="sm" />
                      </MDBBtn>

                      <MDBBtn
                        tag="a"
                        color="none"
                        className="mx-3"
                        style={{
                          color: "black",
                          transition: "color 0.3s", // Adding transition for smooth color change
                        }}
                        onMouseOver={(e) => {
                          e.target.style.color = "red";
                        }} // Change color on hover
                        onMouseOut={(e) => {
                          e.target.style.color = "black";
                        }} // Revert back to original color
                        onClick={signInWithGooogle}
                      >
                        <MDBIcon fab icon="google" size="sm" />
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      )}

      {step === "signup" && (
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
              <MDBCol
                md="6"
                className="position-relative"
                style={{ opacity: "1", fontFamily: "League Spartan" }}
              >
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
                    {/* Error messages for each input field */}
                    <div className="error-message">
                      {isClicked &&
                        formData.fullname === "" &&
                        "Full name is required."}
                    </div>
                    <input
                      className={`input ${isFocused ? "focus" : ""} ${
                        isClicked && formData.fullname === "" ? "error" : ""
                      }`}
                      type="text"
                      value={formData.fullname}
                      placeholder="Full Name"
                      name="fullname"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onChange={handleinputChanges}
                    />

                    <div className="error-message">
                      {isClicked &&
                        formData.username === "" &&
                        "Username is required."}
                    </div>
                    <input
                      className={`input ${isFocused ? "focus" : ""} ${
                        isClicked && formData.username === "" ? "error" : ""
                      }`}
                      type="text"
                      value={formData.username}
                      placeholder="Username"
                      name="username"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onChange={handleinputChanges}
                    />

                    <div className="error-message">
                      {isClicked &&
                        formData.email === "" &&
                        "Email address is required."}
                    </div>
                    <input
                      className={`input ${isFocused ? "focus" : ""} ${
                        isClicked && formData.email === "" ? "error" : ""
                      }`}
                      type="email"
                      value={formData.email}
                      placeholder="Email"
                      name="email"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onChange={handleinputChanges}
                    />

                    <div className="error-message">
                      {isClicked &&
                        formData.password === "" &&
                        "Password is required."}
                    </div>
                    <input
                      className={`input password-input ${
                        isFocused ? "focus" : ""
                      } ${
                        isClicked && formData.password === "" ? "error" : ""
                      }`}
                      type="password"
                      value={formData.password}
                      placeholder="Password"
                      name="password"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onChange={handleinputChanges}
                    />

                    <div className="d-flex justify-content-center mb-4">
                      <MDBCheckbox
                        name="flexCheck"
                        value=""
                        id="flexCheckDefault"
                        label="CAPTCHA"
                      />
                    </div>

                    <button className="button  mb-3" onClick={handleVerify}>
                      SIGN UP
                    </button>

                    <div className="or-container mb-3">
                      <hr className="or-divider"></hr>
                      <h1>Already have an account?</h1>
                      <hr className="or-divider"></hr>
                    </div>

                    <button className="button1 mb-3" onClick={userLogin}>
                      SIGN IN
                    </button>

                    <div className="text-center">
                      <p>SIGN UP WITH</p>

                      <MDBBtn
                        tag="a"
                        color="none"
                        className="mx-3"
                        style={{
                          color: "black",
                          transition: "color 0.3s", // Adding transition for smooth color change
                        }}
                        onMouseOver={(e) => {
                          e.target.style.color = "red";
                        }} // Change color on hover
                        onMouseOut={(e) => {
                          e.target.style.color = "black";
                        }} // Revert back to original color
                        onClick={signInWithFacebook}
                      >
                        <MDBIcon fab icon="facebook-f" size="sm" />
                      </MDBBtn>

                      <MDBBtn
                        tag="a"
                        color="none"
                        className="mx-3"
                        style={{
                          color: "black",
                          transition: "color 0.3s", // Adding transition for smooth color change
                        }}
                        onMouseOver={(e) => {
                          e.target.style.color = "red";
                        }} // Change color on hover
                        onMouseOut={(e) => {
                          e.target.style.color = "black";
                        }} // Revert back to original color
                        onClick={signInWithGooogle}
                      >
                        <MDBIcon fab icon="google" size="sm" />
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              {/* <MDBCol
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
        </MDBCol> */}
            </MDBRow>
          </MDBContainer>
        </div>
      )}

      {step === "setPassword" && (
        <div>
          <Toaster />
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
              {/* <MDBCol
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
    </MDBCol> */}

              <MDBCol
                md="6"
                className="position-relative"
                style={{ opacity: "1", fontFamily: "League Spartan" }}
              >
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
                      Set Password<i className="fa fa-sign-in-alt mb-5"></i>
                    </h2>

                    <div className="error-message">
                      {isClicked &&
                        Password.password === "" &&
                        "Password is required."}
                    </div>

                    <div className="error-message">
                      {isClicked &&
                        Password.password.length > 0 &&
                        Password.password.length < 8 &&
                        "Password must be at least 8 characters long."}
                    </div>

                    <div className="error-message">
                      {isClicked &&
                        Password.password !== "" &&
                        Password.confirmPassword !== "" &&
                        Password.password !== Password.confirmPassword &&
                        "Passwords do not match."}
                    </div>

                    <input
                      className={`input ${isFocused ? "focus" : ""} ${
                        (isClicked && Password.password === "") ||
                        (isClicked &&
                          Password.password.length > 0 &&
                          Password.password.length < 8)
                          ? "error"
                          : ""
                      }`}
                      type="password"
                      placeholder="New Password"
                      name="password"
                      id="form3"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onChange={handlepasswordChanges}
                      value={Password.password}
                    />
                    <div className="error-message">
                      {isClicked &&
                        Password.confirmPassword === "" &&
                        "You must confirm the password."}
                    </div>
                    <input
                      className={`input ${isFocused ? "focus" : ""} ${
                        isClicked && Password.confirmPassword === ""
                          ? "error"
                          : ""
                      }`}
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      id="form4"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onChange={handlepasswordChanges}
                      value={Password.confirmPassword}
                    />

                    <button className="button  mb-3" onClick={saveDatabase}>
                      SIGN UP
                    </button>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      )}

      {step === "verifyEmail" && (
        <div>
          <Toaster />
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
              {/* <MDBCol
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
  </MDBCol> */}

              <MDBCol
                md="6"
                className="position-relative"
                style={{ opacity: "1", fontFamily: "League Spartan" }}
              >
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
                      Verify Email<i className="fa fa-sign-in-alt mb-5"></i>
                    </h2>

                    <MDBInput
                      wrapperClass="mb-4"
                      label="Email"
                      id="form3"
                      type="email"
                      disabled
                      value={formData.email}
                      name="email"
                    />
                    <button
                      className="button3 mb-3"
                      onClick={getCode}
                      disabled={buttonDisabled}
                    >
                      {buttonDisabled
                        ? `Wait for ${remainingTime} seconds`
                        : "GET CODE"}
                    </button>
                    <div className="error-message">
                      {isClicked &&
                        verificationCode === "" &&
                        "Please input a verification code"}
                      {isClicked &&
                        verificationCode !== "" &&
                        verificationCode !== code &&
                        "Wrong Verification Code"}
                    </div> 
                    <input
                      className={`input ${isFocused ? "focus" : ""} ${
                        (isClicked && verificationCode === "") ||
                        (verificationCode !== "" && verificationCode !== code)
                          ? "error"
                          : ""
                      }`}
                      type="number"
                      placeholder={code ? "" : "Enter the Code:****"}
                      value={code}
                      pattern="[0-9]*" // Enforce numeric input
                      name="code"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onChange={handleCode}
                    />

                    <button
                      className="button3 mb-3"
                      onClick={handleVerificationCode}
                    >
                      VERIFY
                    </button>

                    <button
                      className="button2 mb-3"
                      onClick={() => {
                        setStep("signup");
                      }}
                    >
                      Back
                    </button>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      )}
    </div>
  );
}

export default App;
