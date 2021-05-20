import React, { useState, useEffect, useContext } from "react";
import { Grid, Header, Segment, List, Image, Button, Icon, Confirm } from "semantic-ui-react";
import axios from "../../axios-orders";

import Loader from "../../components/Feedback/Loader/Loader";
import ErrorModal from "../../components/Feedback/ErrorModal/ErrorModal";
import AuthContext from "../../context/auth-context";

const YourAccount = (props) => {

  const auth = useContext(AuthContext);

  // ACCOUNT, ERROR AND LOADING STATE
  const [accountState, setAccountState] = useState({
    user: null,
  });

  const [errorState, setErrorState] = useState({
    error: false,
    errorMessage: null,
  });

  const [loadingState, setLoadingState] = useState({
    isLoading: true,
    loadFailed: false,
  });

  // Manage state of confirm deletion dialog
  const [confirmState, setConfirmState] = useState({ open: false });
  const open = () => setConfirmState({ open: true });
  const close = () => setConfirmState({ open: false });

  // FETCH ACCOUNT DETAILS
  useEffect(() => {
    let uid = auth.userId; 
    let path = "/users/" + uid;
    axios
      .get(path, { headers: { Authorization: "Bearer " + auth.token } })
      .then((response) => {
        setAccountState({ user: response.data.user });
      })
      .catch((error) => {
        setErrorState({
          error: true,
          errorMessage: error.response.data.message,
        });
        setLoadingState({
          isLoading: false,
          loadFailed: loadingState.loadFailed,
        });
      });
  }, []);

  // UPDATE AND DELETE HANDLERS
  const updateHandler = () => {
    props.history.push({
      pathname: "/update-account",
      state: {
        user: accountState.user,
      },
    });
  };

  const deleteHandler = () => {
    let uid = auth.userId;
    let path = "/deleteuser/" + uid;
    axios
      .delete(path, { headers: { Authorization: "Bearer " + auth.token } })
      .then((response) => {
        console.log("User deleted!");
        auth.logout();
        props.history.push("/");
      })
      .catch((error) => {
        let errorMsg = "";
        if (error.response) {
          errorMsg = error.response.data.message;
        } else {
          errorMsg = "There was a problem deleting your account";
        }
        setErrorState({ error: true, errorMessage: errorMsg });
      });
  };

  // ERROR HANDLER
  const errorHandler = () => {
    setErrorState({
      error: false,
      errorMessage: null,
    });
    setLoadingState({
      isLoading: false,
      loadFailed: true,
    });
  };

  // DISPLAY ACCOUNT
  let account = errorState.error ? (
    <ErrorModal error={errorState.errorMessage} onClear={errorHandler} />
  ) : (
    <Loader active={loadingState.isLoading} />
  );

  if (accountState.user && !errorState.error) {
    account = (
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={10}>
            <Segment color="red">
              <Grid divided>
                <Grid.Column width={8}>
                  <Header as="h3" textAlign="center" color="red">
                    Your Details
                  </Header>
                  <List>
                    <List.Item>
                      <List.Icon name="user" />
                      <List.Content>
                        <b>Name: {accountState.user.name} </b>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="mail" />
                      <List.Content>
                        <b>Email: {accountState.user.email} </b>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="lock" />
                      <List.Content>
                        <b>Password: </b>{" "}
                        &#9642;&#9642;&#9642;&#9642;&#9642;&#9642;{" "}
                      </List.Content>
                    </List.Item>
                  </List>
                  <div className="accountButtons">
                    <Button
                      icon
                      labelPosition="left"
                      color="orange"
                      onClick={updateHandler}
                    >
                      <Icon name="pencil" />
                      Update Your Details
                    </Button>
                    <br />
                    <br />
                    <Button
                      icon
                      labelPosition="left"
                      color="red"
                      onClick={open}
                    >
                      Delete Your Account
                      <Icon name="trash" />
                    </Button>
                    <Confirm
                      open={confirmState.open}
                      onCancel={close}
                      onConfirm={deleteHandler}
                      header="Are you sure?"
                      content="Deleting your account is a permanent action and cannot be undone"
                      cancelButton="Take me back"
                      confirmButton="Yes, delete my account permanently"
                    />
                  </div>
                </Grid.Column>
                <Grid.Column width={8} textAlign="center">
                  <Image
                    src="https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1474_2_1430128688.jpg?tr=w-800,h-1066"
                    rounded
                    size="large"
                  />
                </Grid.Column>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  } else if (loadingState.loadFailed) {
    account = <p>User can't be found</p>;
  }

  return <React.Fragment>{account}</React.Fragment>;
};

export default YourAccount;
