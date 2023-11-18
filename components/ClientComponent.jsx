"use client";

import Button from "./Buttons/Button";
import removeClass from "@/util/removeClass";
import addClass from "@/util/addClass";

const ClientComponent = ({ children }) => {

  /*
    The event handler function must be defined inside a client component, as client components
    cannot run server functions (functions defined inside a server component)

    This function is an example of toggling a button state called 'selected'
  */
  const onClick = (clickReport) => {
    const buttonState = clickReport.getState();

    // Print out current button state
    console.log("before: ", buttonState.selected);

    // if selected, then unselect
    if (buttonState.selected) {
      buttonState.self_className = removeClass(buttonState.self_className, "bg-red-500")
      buttonState.self_className = addClass(buttonState.self_className, "bg-[#3f3f3f] ")

    // if unselected, then select
    } else {
      buttonState.self_className = removeClass(buttonState.self_className, "bg-[#3f3f3f] ")
      buttonState.self_className = addClass(buttonState.self_className, "bg-red-500")

    }

    /*
      Update the button state with the inverted value. This will re-render the button, as
      this update method is internally calling the react setState hook.
    */
    buttonState.selected = !buttonState.selected
    clickReport.updateState(buttonState);

    // print out updated state
    console.log("after: ", buttonState.selected);
  }

  return <div className="flex flex-col gap-4 p-5">
    <Button onClick={onClick}>Hello</Button>

    <Button rightIcon="/icons/plus_icon.svg">
      Testing
    </Button>

    <Button leftIcon="/icons/trash_icon.svg">
      Delete
    </Button>

    <Button leftIcon="/icons/gem_icon.svg" rightIcon="/icons/gem_icon.svg" activateOnRender onClick={() => console.log("clicked initially")}>
      Favorites
    </Button>

    <Button href="https://www.youtube.com">YouTube</Button>
  </div>
};

export default ClientComponent;