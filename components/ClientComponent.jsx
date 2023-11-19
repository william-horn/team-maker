"use client";

import Button from "./Buttons/Button";
import Text from "./Typography/Text";
import Icon from "./Graphics/Icon";
import Heading from "./Typography/Heading";
import ButtonGroup from "./Buttons/ButtonGroup";

const ClientComponent = ({ children }) => {

  return <div className="p-5">

    {/* <ButtonGroup
    mode="choose"
    >
      <ButtonGroup.Button option="one">Choice One</ButtonGroup.Button>
      <ButtonGroup.Button option="two">Choice Two</ButtonGroup.Button>
      <ButtonGroup.Button option="three">Choice Three</ButtonGroup.Button>
    </ButtonGroup> */}

    <Text>Lorem ipsum dolor sit, amet <Button leftIcon="/icons/plus_icon.svg" inline>Again</Button>consectetur adipisicing elit. Possimus, here:<Button display="inline-flex">Hello world</Button></Text>
    <Button>Hello world</Button>

    <Heading>Welcome</Heading>
    <Text>Lorem ipsum dolor sit amet.</Text>
    <Text large bold>Lorem, ipsum dolor.</Text>

    {/* <ButtonGroup>
      <ButtonGroup.Checkbox></ButtonGroup.Checkbox>
    </ButtonGroup> */}
    
  </div>
};

export default ClientComponent;