import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGooglePlusG, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../utils/firebase';


function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { email, password } = state;
    alert(`You are logging in with email: ${email} and password: ${password}`);

    setState({
      email: "",
      password: "",
    });
  };

  const handleSocialClick = (event, provider) => {
    // Handle social click
  };
  const signInWithGooogle = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      console.log('LOGGED USER', result.user);
    } catch (error) {
      console.log(error)
    }
  }

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();

      const result = await signInWithPopup(auth, provider);

      console.log('LOGGED USER', result.user);
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <button onClick={signInWithFacebook} className="social">
            <FontAwesomeIcon icon={faFacebookF} />
          </button>
          <button onClick={signInWithGooogle} className="social">
            <FontAwesomeIcon icon={faGooglePlusG} />
          </button>
          <button onClick={(event) => handleSocialClick(event, 'linkedin')} className="social">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </button>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
