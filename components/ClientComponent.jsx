"use client";

import Button from "./Buttons/Button";
import Text from "./Typography/Text";
import Icon from "./Graphics/Icon";
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

  return <div className="p-5">

    
    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, nesciunt.</Text>
    {/* <Button inline>Button</Button> */}
    <Text inline>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, architecto.</Text>

    <Button inline>Button</Button>

    <Text inline>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate, consequuntur.</Text>

    <div className="w-full h-10"></div>

    <Text>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore natus id earum ipsum repellat et provident corporis ducimus rerum facilis.
      <Button inline leftIcon="/icons/profile_icon.svg">Demo</Button>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloribus enim soluta facere, eum quidem pariatur error impedit molestiae commodi.
      <Button>Demo</Button>
      Lorem ipsum dolor sit amet.
    </Text>
  </div>
};

export default ClientComponent;