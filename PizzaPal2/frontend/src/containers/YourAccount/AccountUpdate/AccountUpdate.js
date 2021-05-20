import React, { useState, useContext } from "react";
import { Grid, Form, Header, Segment, Button } from "semantic-ui-react";
import axios from "../../../axios-orders";

import ErrorModal from "../../../components/Feedback/ErrorModal/ErrorModal";
import AuthContext from "../../../context/auth-context";

const AccountUpdate = (props) => {

  const auth = useContext(AuthContext);

  const [accountState, setAccountState] = useState({
    user: props.history.location.state.user,
  });

  const [errorState, setErrorState] = useState({
    error: false,
    errorMessage: null,
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
      if (!validation.rules[i].valid) {
        formIsValid = false;
      }
    }

    // update state
    setValidationState({ rules: validation.rules, formValid: formIsValid });
  };

  const formChangedHandler = (event, inputIdentifier) => {
    let userDetails = accountState.user;

    switch (inputIdentifier) {
      case "form-input-name":
        userDetails.name = event.target.value;
        validate(event.target.value, inputIdentifier);
        break;
      case "form-input-email":
        userDetails.email = event.target.value;
        validate(event.target.value, inputIdentifier);
        break;
      case "form-input-password":
        let password = event.target.value;
        let trimmedPassword = password.trim();
        userDetails.password = trimmedPassword;
        validate(trimmedPassword, inputIdentifier);
        break;
      default:
      // code block
    }

    setAccountState({ user: userDetails });
  };

  const updateHandler = () => {
    let uid = auth.userId;
    let path = "/updateuser/" + uid;
    axios
      .put(path, accountState.user, {
        headers: { Authorization: "Bearer " + auth.token },
      })
      .then((response) => {
        props.history.push("/users/" + auth.userId);
      })
      .catch((error) => {
        let errorMsg = "";
        if (error.response) {
          errorMsg = error.response.data.message;
        } else {
          errorMsg = "There was a problem updating your account";
        }
        setErrorState({ error: true, errorMessage: errorMsg });
      });
  };

  let disabled = !validationState.formValid;

  const errorHandler = () => {
    setErrorState({
      error: false,
      errorMessage: null,
    });
  };

  let updateForm = null;

  if (errorState.error) {
    updateForm = (
      <ErrorModal error={errorState.errorMessage} onClear={errorHandler} />
    );
  } else {
    updateForm = (
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={10}>
            <Segment color="red">
              <Header as="h2" textAlign="center" color="red">
                Update Your Details
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
                  onChange={(event) =>
                    formChangedHandler(event, "form-input-name")
                  }
                />
                <Button
                  type="submit"
                  color="green"
                  disabled={disabled}
                  onClick={updateHandler}
                >
                  Update Details
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return <React.Fragment>{updateForm}</React.Fragment>;
};

export default AccountUpdate;
