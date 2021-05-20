import React, { useState, useContext } from "react";
import { Grid, Form, Header, Segment, Button } from "semantic-ui-react";

import ErrorModal from "../../components/Feedback/ErrorModal/ErrorModal";
import AuthContext from "../../context/auth-context";
import axios from '../../axios-orders';

const Authenticate = (props) => {

  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(false);

  const [errorState, setErrorState] = useState({
    error: false,
    errorMessage: null,
  });

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
    setAuthDetailsState({
      details: {
        name: "",
        email: "",
        password: "",
      },
    });
    setValidationState({
      rules: [
        {
          id: "form-input-name",
          message:
            "Please enter your name (letters and spaces only, min length 2)",
          required: true,
          valid: false,
        },
        {
          id: "form-input-email",
          message:
            "Please enter a valid email address (something@something.something)",
          required: true,
          valid: false,
        },
        {
          id: "form-input-password",
          message:
            "Please enter a password (letters and numbers only, min length 6)",
          required: true,
          valid: false,
        },
      ],
      formValid: false,
    });
    document.getElementById("form").reset();
  };

  const [authDetailsState, setAuthDetailsState] = useState({
    details: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [validationState, setValidationState] = useState({
    rules: [
      {
        id: "form-input-name",
        message:
          "Please enter your name (letters and spaces only, min length 2)",
        required: true,
        valid: false,
      },
      {
        id: "form-input-email",
        message:
          "Please enter a valid email address (something@something.something)",
        required: true,
        valid: false,
      },
      {
        id: "form-input-password",
        message:
          "Please enter a password (letters and numbers only, min length 6)",
        required: true,
        valid: false,
      },
    ],
    formValid: false,
  });

  const [messageState, setMessageState] = useState({
    name: null,
    email: null,
    address: null,
  });

  const validate = (value, inputIdentifier) => {
    // copy the validation state
    const validation = { ...validationState };

    // find the rule for this input
    const inputRule = validation.rules.findIndex(
      (input) => input.id === inputIdentifier
    );

    let message = null;

    // check if it is required and also empty
    if (validation.rules[inputRule].required && value.trim() === "") {
      // get the error message and set valid to false
      message = validation.rules[inputRule].message;
      validation.rules[inputRule].valid = false;
    } else if (inputIdentifier === "form-input-email") {
      //check for a valid email

      let pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      let validEmail = pattern.test(value);

      if (validEmail) {
        validation.rules[inputRule].valid = true;
      } else {
        validation.rules[inputRule].valid = false;
        message = validation.rules[inputRule].message;
      }
    } else if (inputIdentifier === "form-input-password") {
      //check for a valid password, letters and numbers only, 6 characters min

      let pattern = /^[A-Za-z0-9\s]{6,}$/;
      let validPassword = pattern.test(value);

      if (validPassword) {
        validation.rules[inputRule].valid = true;
      } else {
        validation.rules[inputRule].valid = false;
        message = validation.rules[inputRule].message;
      }
    } else if (
      validation.rules[inputRule].required &&
      inputIdentifier === "form-input-name"
    ) {
      //check for a valid name (letters and spaces only)

      let pattern = /^[A-Za-z\s]{2,30}$/;
      let validName = pattern.test(value);

      if (validName) {
        validation.rules[inputRule].valid = true;
      } else {
        validation.rules[inputRule].valid = false;
        message = validation.rules[inputRule].message;
      }
    } else {
      // otherwise reset the message and set valid back to true
      message = null;
      validation.rules[inputRule].valid = true;
    }

    let msgState = { ...messageState };

    switch (inputIdentifier) {
      case "form-input-name":
        msgState.name = message;
        break;
      case "form-input-email":
        msgState.email = message;
        break;
      case "form-input-password":
        msgState.password = message;
        break;
      default:
      // code block
    }

    setMessageState({ ...msgState });

    // check if the whole form is valid
    let formIsValid = true;

    for (let i in validation.rules) {
      if (isLoginMode && i == 0) {
        continue;
      }

      if (!validation.rules[i].valid) {
        formIsValid = false;
      }
    }

    // update state
    setValidationState({ rules: validation.rules, formValid: formIsValid });
  };

  const formChangedHandler = (event, inputIdentifier) => {
    let authDetails = authDetailsState.details;

    switch (inputIdentifier) {
      case "form-input-name":
        authDetails.name = event.target.value;
        validate(event.target.value, inputIdentifier);
        break;
      case "form-input-email":
        authDetails.email = event.target.value;
        validate(event.target.value, inputIdentifier);
        break;
      case "form-input-password":
        let password = event.target.value;
        let trimmedPassword = password.trim();
        authDetails.password = trimmedPassword;
        validate(trimmedPassword, inputIdentifier);
        break;
      default:
      // code block
    }

    setAuthDetailsState({ details: authDetails });
  };

  const errorHandler = () => {
    setErrorState({
      error: false,
      errorMessage: null,
    });
  };

  const signupHandler = () => {
    axios
      .post("/signup", authDetailsState.details)
      .then((response) => {
        auth.login(response.data.userId, response.data.token);
        props.history.push("/");
      })
      .catch((error) => {
        let errorMsg = "";
        if (error.response) {
          errorMsg = error.response.data.message;
        } else {
          errorMsg = "Something went wrong - signup failed";
        }
        setErrorState({ error: true, errorMessage: errorMsg });
      });
  };

  const loginHandler = () => {
    axios
      .post("/login", authDetailsState.details)
      .then((response) => {
        auth.login(response.data.userId, response.data.token);
        props.history.push("/");
      })
      .catch((error) => {
        let errorMsg = "";
        if (error.response) {
          errorMsg = error.response.data.message;
        } else {
          errorMsg = "Something went wrong - login failed";
        }
        setErrorState({ error: true, errorMessage: errorMsg });
      });
  };

  let disabled = !validationState.formValid;

  let signupBtnColor = "grey";
  let loginBtnColor = "grey";

  let authForm = null;

  if (errorState.error) {
    authForm = (
      <ErrorModal error={errorState.errorMessage} onClear={errorHandler} />
    );
  } else {
    if (isLoginMode) {
      authForm = (
        <Segment color="red">
          <Header as="h2" textAlign="center" color="red">
            Already registered? Log In!
          </Header>
          <Form id="form">
            <Form.Input
              error={messageState.email}
              autoComplete="off"
              required
              label="Email"
              placeholder="Email e.g. username@mail.com"
              id="form-input-email"
              onChange={(event) =>
                formChangedHandler(event, "form-input-email")
              }
            />
            <Form.Input
              error={messageState.password}
              type="password"
              autoComplete="off"
              required
              label="Password"
              placeholder="Password"
              id="form-input-password"
              onChange={(event) =>
                formChangedHandler(event, "form-input-password")
              }
            />
            <Button
              type="submit"
              color="green"
              disabled={disabled}
              onClick={loginHandler}
            >
              Log In
            </Button>
          </Form>
        </Segment>
      );
      loginBtnColor = "red";
    } else {
      authForm = (
        <Segment color="red">
          <Header as="h2" textAlign="center" color="red">
            First time here? Sign Up!
          </Header>
          <Form id="form">
            <Form.Input
              error={messageState.email}
              autoComplete="off"
              required
              label="Email"
              placeholder="Email e.g. username@mail.com"
              id="form-input-email"
              onChange={(event) =>
                formChangedHandler(event, "form-input-email")
              }
            />
            <Form.Input
              error={messageState.password}
              type="password"
              autoComplete="off"
              required
              label="Password"
              placeholder="Password"
              id="form-input-password"
              onChange={(event) =>
                formChangedHandler(event, "form-input-password")
              }
            />
            <Form.Input
              error={messageState.name}
              autoComplete="off"
              required
              label="Name"
              placeholder="Name"
              id="form-input-name"
              onChange={(event) => formChangedHandler(event, "form-input-name")}
            />
            <Button
              type="submit"
              color="green"
              disabled={disabled}
              onClick={signupHandler}
            >
              Sign Up
            </Button>
          </Form>
        </Segment>
      );
      signupBtnColor = "red";
    }
  }

  return (
    <Grid>
      <Grid.Row centered>
        <Grid.Column width={10}>
          <Button.Group widths="2">
            <Button
              size="large"
              color={signupBtnColor}
              onClick={switchModeHandler}
            >
              Sign Up
            </Button>
            <Button.Or />
            <Button
              size="large"
              color={loginBtnColor}
              onClick={switchModeHandler}
            >
              Log In
            </Button>
          </Button.Group>
          {authForm}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Authenticate;
