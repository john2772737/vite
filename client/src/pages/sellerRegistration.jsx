import React, { useState } from "react";
import { auth } from "../utils/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneVerification = () => {
  const [step, setStep] = useState("phone"); // 'phone' or 'verification'
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
console.log(phoneNumber)
  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    const appVerifier = new RecaptchaVerifier(auth, "appVerifier", {});

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        setStep("verification");
      })
      .catch((error) => {
        console.log(error);
        // Handle error
      });
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    const code = verificationCode.trim(); // Trim any whitespace from the code
    const confirmationResult = window.confirmationResult;

    confirmationResult
      .confirm(code)
      .then((userCredential) => {
        // Phone number authentication successful
        const user = userCredential.user;
        console.log("User authenticated:", user);
        // Proceed with further actions (e.g., redirecting the user)
      })
      .catch((error) => {
        // Handle verification error
        console.error("Verification error:", error);
        // Display error message to the user
      });
  };

  const handlePhoneInputChange = (value) => {
    // Prepend plus sign to the beginning of the phone number
    const formattedPhoneNumber = value.startsWith("+") ? value : `+${value}`;
    setPhoneNumber(formattedPhoneNumber);
  };


  return (
    <div>
      {step === "phone" && (
        <form>
          <label>
            Phone Number:
            <PhoneInput
              country={"ph"}
              value={phoneNumber}
              onChange={handlePhoneInputChange}
            />
          </label>
          <button type="submit" onClick={handlePhoneSubmit}>
            Submit
          </button>
          <div id="appVerifier"></div>
        </form>
      )}
      {step === "verification" && (
        <form onSubmit={handleVerificationSubmit}>
          <label>
            Verification Code:
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </label>
          <button type="submit">Verify</button>
        </form>
      )}
    </div>
  );
};

export default PhoneVerification;
