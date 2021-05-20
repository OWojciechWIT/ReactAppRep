import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

const Loading = (props) => {
  return (
    <Segment>
      <Dimmer active={props.active} inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    </Segment>
  );
};

export default Loading;
