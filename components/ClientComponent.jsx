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

  return <div className="p-5">

    <ButtonGroup
    mode="select"
    limit="2"
    defaultSelect="one"
    onSelect={buttonSelected}
    onUnselect={buttonUnselected}
    groupName="group one"
    >
      <ButtonGroup.Button id="one">Choice One</ButtonGroup.Button>
      <ButtonGroup.Button id="two">Choice Two</ButtonGroup.Button>
      <ButtonGroup.Button id="three">Choice Three</ButtonGroup.Button>
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