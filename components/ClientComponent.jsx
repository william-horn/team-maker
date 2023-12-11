"use client";

import Button from "./Buttons/Button";
import Text from "./Typography/Text";
import Icon from "./Graphics/Icon";
import Heading from "./Typography/Heading";
import ButtonGroup from "./Buttons/ButtonGroup";
import ImageButton from "./Buttons/ImageButton";

// const buttonPreset1 = {
//   "bg-color": "bg-black",
//   "bg-color-selected": "bg-pink-500",
//   "text-color": "text-green-500",
// }

// const buttonPreset2 = {
//   "bg-color": "bg-red-500",
//   "bg-color-selected": "bg-yellow-500"
// }

const ClientComponent = ({ children }) => {

  return (
    <div className="p-5">
      {/* <Text>Hello, world! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, quod.</Text>
      <Text inline={true}>How are we? Lorem ipsum dolor sit amet.</Text><Button>test</Button><Text>lol</Text>
      <Button>Default</Button>
      <Button preset={buttonPreset1}>New Test</Button> */}

      <ButtonGroup
      mode="checkbox"
      selectionLimit="1"
      unselectLastChoice
      // itemPreset={buttonPreset1}
      className={{
        self: "",
        selectButton: {
          self: "bg-green-500",
          __selected: {
            self: "bg-red-500"
          }
        },
      }}
      rightIconUnselected="/icons/arrow_down_icon.svg"
      rightIconSelected="/icons/arrow_up_icon.svg"
      >
        <ButtonGroup.Button id="one">Choice One</ButtonGroup.Button>
        <ButtonGroup.Button id="two">Choice Two</ButtonGroup.Button>
        <ButtonGroup.Button id="three">Choice Three</ButtonGroup.Button>

        <ButtonGroup.Button id="four">
            Choice Four
          </ButtonGroup.Button>

      </ButtonGroup>
{/* 
      <Button>Normal</Button>

      <Button className={{__selected: { self: " text-error" }}}>
        Something
      </Button> */}

      {/* <Button
      className={{
        self: "text-green-500", 
        inner: {
          self: "p-0"
        }}}
      >
        Something
      </Button> */}

    </div>
  );
};

export default ClientComponent;