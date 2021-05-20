import React from "react";
import { Button, Modal } from "semantic-ui-react";

const ErrorModal = (props) => {
  const [open, setOpen] = React.useState(!!props.error);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Something went wrong</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>{props.error}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Okay"
          onClick={() => {
            props.onClear();
            setOpen(false);
          }}
          color="red"
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ErrorModal;
