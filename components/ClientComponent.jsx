"use client";

import Button from "./Buttons/Button";
import Text from "./Typography/Text";
import Icon from "./Graphics/Icon";
import Heading from "./Typography/Heading";
import ButtonGroup from "./Buttons/ButtonGroup";

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

    console.log("button has been unselected: ", data, state);
  }

  const onSelectionLimitReached = data => {
    console.log("selection limit reached: ", data);
  }

  return <div className="p-5">

    <Heading>Welcome to Raven</Heading>
    <Text className="pb-4">Before we get started, please select the following options:</Text>
    
    <ButtonGroup
    mode="select"
    defaultSelect="three"
    selectionLimit="2"
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