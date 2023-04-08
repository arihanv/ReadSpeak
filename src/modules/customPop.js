import React from "react";
import Popover from "react-bootstrap/Popover";

export const CustomPop = (body, title) => {
  return (
    <Popover id="popover-basic">
        {
            title && <Popover.Header as="h3">{title}</Popover.Header>
        }
      <Popover.Body>
        {body}
      </Popover.Body>
    </Popover>
  );
};
