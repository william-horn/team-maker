"use client";

import Button from "./Buttons/Button";
import Text from "./Typography/Text";
import Icon from "./Graphics/Icon";
import Heading from "./Typography/Heading";
import ButtonGroup from "./Buttons/ButtonGroup";
import ImageButton from "./Buttons/ImageButton";


const ClientComponent = ({ children }) => {

  const groupClick = (data) => {
    console.log("group click: ", data);
  }

  const buttonClick = (data) => {
    console.log("button click: ", data);
  }

  const buttonSelected = (data) => {
    console.log("button has been selected: ", data);
  }

  const buttonUnselected = (data) => {
    console.log("button has been unselected: ", data);
  }

  const onSelectionLimitReached = data => {
    console.log("selection limit reached: ", data);
  }

  return <div className="p-5">
    
    {/* Testing button group */}
    <ButtonGroup
    mode="select"
    selectionLimit="1"
    unselectLastChoice={true}
    onSelect={buttonSelected}
    onUnselect={buttonUnselected}
    onSelectionLimitReached={onSelectionLimitReached}
    leftIconSelected="/icons/checkbox_selected.svg"
    leftIconUnselected="/icons/checkbox_unselected.svg"
    groupName="group one"
    >
      <ButtonGroup.Button id="one" value={1}>Choice One</ButtonGroup.Button>
      <ButtonGroup.Button id="two" value={2} activateOnRender>Choice Two</ButtonGroup.Button>
      <Text>Sup!</Text>
      <ButtonGroup.Button id="three" value={3}>Choice Three</ButtonGroup.Button>
      <ButtonGroup.Button id="four" value={4} mode="checkbox">Choice Four</ButtonGroup.Button>
      <ButtonGroup.Button id="five" value={5}>Choice Five</ButtonGroup.Button>
    </ButtonGroup>

    <div className="w-full h-5 my-8 bg-black"></div>

    {/* Testing button group */}
    <ButtonGroup
    mode="checkbox"
    selectionLimit="1"
    unselectLastChoice={true}
    onSelect={buttonSelected}
    onUnselect={buttonUnselected}
    onSelectionLimitReached={onSelectionLimitReached}
    leftIconSelected="/icons/checkbox_selected.svg"
    leftIconUnselected="/icons/checkbox_unselected.svg"
    groupName="group one"
    >
      <ButtonGroup.Button id="one" value={1}>Choice One</ButtonGroup.Button>
      <ButtonGroup.Button id="two" value={2}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, possimus.</ButtonGroup.Button>
      <ButtonGroup.Button id="three" value={3}>Choice Three</ButtonGroup.Button>
      <ButtonGroup.Button id="four" value={4}>Choice Four</ButtonGroup.Button>
      <ButtonGroup.Button id="five" value={5}>Choice Five</ButtonGroup.Button>
    </ButtonGroup>

    <div className="w-full h-5 my-8 bg-black"></div>
    
    <Button href="https://www.youtube.com">Click Here!</Button>

    <div className="w-full h-5 my-8 bg-black"></div>

    {/* Testing button with nested icon */}
    <Button 
    innerPadding="p-0" 
    outerPadding="p-0"
    noBackground>
      <Icon 
      src="/icons/plus_icon.svg"
      filter="invert"
      />
    </Button>

    <div className="w-full h-5 my-8 bg-black"></div>

    {/* Testing normal button */}
    <Button size="text-xl">
      something
    </Button>

    <div className="w-full h-5 my-8 bg-black"></div>

    {/* Testing button with text and nested icon */}
    <Button>tttt <Icon src="/icons/profile_icon.svg" filter="invert"/> tttt</Button>

    <div className="w-full h-5 my-8 bg-black"></div>

    {/* Testing button left/right icons */}
    <Button leftIcon="/icons/trash_icon.svg">Stuff</Button>

    <div className="w-full h-5 my-8 bg-black"></div>

    {/* Testing typography */}
    <Heading bold underline>Welcome</Heading>

    <Text inline>Some sub-text<Button size="text-lg" inline>Normal Button</Button>lol</Text>
    <Text inline>Sounds good!</Text>
    <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod blanditiis optio exercitationem aliquid quaerat maxime!</Text>

    <div className="w-full h-5 my-8 bg-black"></div>

    <Text inline underline>Some sub-text</Text>
    <Button size="text-lg" outerPadding="p-1" innerPadding="p-1" inline bold>Normal Button</Button>
    <Text inline>Some sub-text</Text>
    <Text inline>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus, rem? Consequuntur molestias eligendi facere inventore tempora tenetur rerum commodi quasi.</Text>
    <Button outerPadding="px-0 py-0 my-1" innerPadding="px-2 py-1" bold>Buy</Button>
    <Text underline bold inline>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, quasi?</Text>

    <div className="w-full h-5 my-8 bg-black"></div>

    {/* ! BOLD PROP ISN'T WORKING */}

    {/* Testing image buttons */}
    <ImageButton 
    src="/icons/settings_icon.svg" 
    width="w-10" 
    height="h-10"
    filter="invert"
    href="https://www.youtube.com"
    onClick={() => console.log("clicked!")}
    />
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