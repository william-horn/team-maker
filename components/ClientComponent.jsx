"use client";

import Button from "./Buttons/Button";
import Text from "./Typography/Text";
import Icon from "./Graphics/Icon";
import Heading from "./Typography/Heading";
import ButtonGroup from "./Buttons/ButtonGroup";

const ClientComponent = ({ children }) => {

  const groupClick = (data) => {
    console.log("group click: ", data);
  }

  const buttonClick = (data) => {
    console.log("button click: ", data);
  }

  return <div className="p-5">

    <ButtonGroup
    mode="select"
    limit="2"
    onClick={groupClick}
    groupName="group one"
    >
      <ButtonGroup.Button option="one" onClick={buttonClick}>Choice One</ButtonGroup.Button>
      <ButtonGroup.Button option="two">Choice Two</ButtonGroup.Button>
      <ButtonGroup.Button option="three">Choice Three</ButtonGroup.Button>
    </ButtonGroup>

    <ButtonGroup
    onClick={groupClick}
    groupName="group two"
    >
      <ButtonGroup.Button option="one" onClick={buttonClick}>Choice A</ButtonGroup.Button>
      <ButtonGroup.Button option="two">Choice B</ButtonGroup.Button>
      <ButtonGroup.Button option="three">Choice C</ButtonGroup.Button>
    </ButtonGroup>


    {/* <ButtonGroup>
      <ButtonGroup.Checkbox></ButtonGroup.Checkbox>
    </ButtonGroup> */}
    
  </div>
};

export default ClientComponent;