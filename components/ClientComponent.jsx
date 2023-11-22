"use client";

import Button from "./Buttons/Button";
import Text from "./Typography/Text";
import Icon from "./Graphics/Icon";
import Heading from "./Typography/Heading";
import ButtonGroup from "./Buttons/ButtonGroup";
import ImageButton from "./Buttons/ImageButton";

import addClass from "@/util/addClass";
import removeClass from "@/util/removeClass";

const ClientComponent = ({ children }) => {

  const groupClick = (data) => {
    console.log("group click: ", data);
  }

  const buttonClick = (data) => {
    console.log("button click: ", data);
  }

  const buttonSelected = (data) => {
    const state = data.state;

    console.log("button has been selected: ", data, state);
  }

  const buttonUnselected = (data) => {
    const state = data.state;

    console.log("button has been unselected: ", data);
  }

  const onSelectionLimitReached = data => {
    console.log("selection limit reached: ", data);
  }

  return <div className="p-5">
    
    <ButtonGroup
    mode="select"
    defaultSelect={["three"]}
    selectionLimit="1"
    unselectLastChoice={true}
    onSelect={buttonSelected}
    onUnselect={buttonUnselected}
    onSelectionLimitReached={onSelectionLimitReached}
    groupName="group one"
    >
      <ButtonGroup.Button id="one" value={1}>Choice One</ButtonGroup.Button>
      <ButtonGroup.Button id="two" value={2}>Choice Two</ButtonGroup.Button>
      <ButtonGroup.Button id="three" value={3}>Choice Three</ButtonGroup.Button>
      <ButtonGroup.Button id="four" value={4}>Choice Four</ButtonGroup.Button>
      <ButtonGroup.Button id="five" value={5}>Choice Five</ButtonGroup.Button>
    </ButtonGroup>

    <Button 
    innerPadding="p-0" 
    outerPadding="p-0"
    noBackground>
      <Icon 
      src="/icons/plus_icon.svg"
      filter="invert"
      />
    </Button>

    <Button size="text-xl">
      something
    </Button>

    <Button leftIcon="/icons/trash_icon.svg">Stuff</Button>

    <Heading>Welcome</Heading>

    <Text inline>Some sub-text<Button size="text-xs" inline>Normal Button</Button>lol</Text>
    <Text inline>Sounds good!</Text>
    <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod blanditiis optio exercitationem aliquid quaerat maxime!</Text>

    <Text inline>Some sub-text</Text>
    <Button size="text-xs" inline>Normal Button</Button>
    <Text inline>Some sub-text</Text>
    {/* <ButtonGroup
    onClick={groupClick}
    groupName="group two"
    mode="checkbox"
    >
      <ButtonGroup.Button option="one">Choice A</ButtonGroup.Button>
      <ButtonGroup.Button option="two">Choice B</ButtonGroup.Button>
      <ButtonGroup.Button option="three">Choice C</ButtonGroup.Button>
    </ButtonGroup> */}


    {/* <ButtonGroup>
      <ButtonGroup.Checkbox></ButtonGroup.Checkbox>
    </ButtonGroup> */}
    
  </div>
};

export default ClientComponent;