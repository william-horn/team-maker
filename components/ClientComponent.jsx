"use client";

import Button from "./Buttons/Button";

const ClientComponent = ({ children, clickProcess }) => {

  /*
    The event handler function must be defined inside a client component, as client components
    cannot run server functions (functions defined inside a server component)

    This function is an example of toggling a button state called 'selected'
  */
  const onClick = (clickReport) => {
    const buttonState = clickReport.buttonState;

    // Print out current button state
    console.log("selected: ", buttonState.selected);

    /*
      Update the button state with the inverted value. This will re-render the button, as
      this update method is internally calling the react setState hook.
    */
      buttonState.update({ selected: !buttonState.selected });
  }

  return <>
    <Button onClick={onClick}>Hello</Button>
  </>
};

export default ClientComponent;