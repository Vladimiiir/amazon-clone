import React, { useState, createContext, useContext } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";

function Signup() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const register = (e) => {
    e.preventDefault();
    // firebase goes here
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: displayName,
        });
        //...
        if (user) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="signup">
      <Link to="/">
        <img
          className="signup__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="signup__container">
        <h1>Create account</h1>
        <form>
          <h5>Your name</h5>

          <input
            placeholder="First and last name"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <h5>Mobile number or email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h6>Passwords must be at least 6 characters.</h6>
          <h5>Re-enter password</h5>
          <input
            type="password"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
          />
          <button
            className="signup__ContinueButton"
            onClick={register}
            type="submit"
          >
            Continue
          </button>
        </form>
        <p>
          By creating an account, you agree to Amazon's{" "}
          <a
            style={{ color: "#0066c0" }}
            href="https://www.amazon.ae/gp/help/customer/display.html/ref=ap_register_notification_condition_of_use?ie=UTF8&nodeId=201909000"
          >
            Conditions of Use
          </a>{" "}
          and{" "}
          <a
            style={{ color: "#0066c0" }}
            href="https://www.amazon.ae/gp/help/customer/display.html/ref=ap_register_notification_privacy_notice?ie=UTF8&nodeId=201909010"
          >
            Privacy Notice
          </a>
        </p>
        <div className="alreadyUserSignIn">
          <div className="alreadyUserSignIn__left">
            <h6>Already have an account?</h6>
          </div>
          <div className="alreadyUserSignIn__right">
            <Link to="/login">
              <h6 className="signIn__option">Sign in</h6>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
