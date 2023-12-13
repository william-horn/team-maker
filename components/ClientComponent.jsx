"use client";

import Button from "./Buttons/Button";
import Text from "./Typography/Text";
import Icon from "./Graphics/Icon";
import Heading from "./Typography/Heading";
import ButtonGroup from "./Buttons/ButtonGroup";
import ImageButton from "./Buttons/ImageButton";
import Dropdown from "./Buttons/Dropdown";

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

  const onSelect = (choice) => {
    console.log(choice);
  }

  return (
    <div className="p-5">
      {/* <Text>Hello, world! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, quod.</Text>
      <Text inline={true}>How are we? Lorem ipsum dolor sit amet.</Text><Button>test</Button><Text>lol</Text>
      <Button>Default</Button>
      <Button preset={buttonPreset1}>New Test</Button> */}

      <ButtonGroup
      mode="checkbox"
      selectionLimit="2"
      unselectLastChoice
      onSelect={onSelect}
      // itemPreset={buttonPreset1}
      className={{
        self: "gap-1",
        selectButton: {
          self: "bg-green-500",
          __selected: {
            self: "bg-red-500"
          }
        },
        checkboxButton: {
          self: "transition-all bg-transparent",
          __selected: {
            self: "bg-red-500"
          }
        }
      }}
      rightIconUnselected="/icons/arrow_down_icon.svg"
      rightIconSelected="/icons/arrow_up_icon.svg"
      >
        <ButtonGroup.Button id="one">Lorem ipsum dolor sit amet.</ButtonGroup.Button>
        <ButtonGroup.Button id="two">Lorem ipsum dolor sit amet.</ButtonGroup.Button>
        <ButtonGroup.Button id="three">Lorem ipsum dolor sit amet consectetur.</ButtonGroup.Button>

        <ButtonGroup.Button id="four">
          Choice Four
        </ButtonGroup.Button>

      </ButtonGroup>

      <Text>Hello, world! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, consequuntur.</Text>
      
      <Button
      onSelect={onSelect}
      className={{
        self: "bg-blue-500",
        __selected: {
          self: "bg-red-500"
        }
      }}>
        Fun Button
      </Button>

      <Button className={{self: "flex"}}>Just a Normal Button</Button>

      <Button rightIcon="/icons/arrow_down_icon.svg">Menu</Button>

      <Heading className={{self: "font-bold"}}>Some Heading</Heading>
      <Text>Some paragraph test</Text>

      <Button href="https://www.youtube.com">YouTube</Button>

      <Dropdown
      mode="select"
      className={{
        list: {
          // self: " w-[200%]"
          self: "overflow-y-scroll"
        },  
        menuButton: {
          __selected: {
            self: "rounded-b-none"
          }
        }
      }}
      // mode="links"
      >
        <Dropdown.Item>Item One</Dropdown.Item>
        <Dropdown.Item rightIcon="/icons/trash_icon.svg">Item Two</Dropdown.Item>
        <Dropdown.Item rightIcon="/icons/trash_icon.svg">Item Three Long Name</Dropdown.Item>
        <Dropdown.Item>Item Three</Dropdown.Item>
        <Dropdown.Item>Item Three</Dropdown.Item>
        <Dropdown.Item>Item Three</Dropdown.Item>
      </Dropdown>

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