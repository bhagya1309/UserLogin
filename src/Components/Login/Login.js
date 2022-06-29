import { useState, useEffect, useContext } from "react";
import "./Login.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import AuthContext from "../Context/auth-context";

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const ctx = useContext(AuthContext);
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);

    //clean up
    return () => {
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  //Email
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    //{*********Added in UseEffect*********}
    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
  };

  const validateEmail = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  //Password
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    //{*********Added in UseEffect*********}
    // setFormIsValid(
    //   enteredEmail.includes("@") && event.target.value.trim().length > 6
    // );
  };

  const validatePassword = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className="login">
      <form onSubmit={submitHandler}>
        <div className={`control ${emailIsValid === false ? "invalid" : ""}`}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            onChange={emailChangeHandler}
            value={enteredEmail}
            onBlur={validateEmail}
          />
        </div>
        <div
          className={`control ${passwordIsValid === false ? "invalid" : ""}`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            value={enteredPassword}
            onBlur={validatePassword}
          />
        </div>
        <div className="actions">
          <Button type="submit" className="btn" disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
