import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

// import { UserContext } from "../../context/user.context";

// import {
//   signInAuthWithEmailAndPassword,
// } from "../../utils/firebase/firebase.utils";

import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

import "./sign-in-form.styles.scss";
import { selectCurrentUser } from "../../store/user/user.selector";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const currentUser = useSelector(selectCurrentUser)
  const navigate = useNavigate();
  // const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const SignInWithGoogle = async () => {
    dispatch(googleSignInStart())
    // if(currentUser) {
    //   navigate('/');
    // } else {
    //   alert('Invalid credentials');
    // }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password))
      // const { user } = await signInAuthWithEmailAndPassword(email, password);
      // setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/invalid-credential":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          required
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          required
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google-sign-in" onClick={SignInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
