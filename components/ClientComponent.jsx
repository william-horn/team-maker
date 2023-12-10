"use client";

import Button from "./Buttons/Button";
import Text from "./Typography/Text";
import Icon from "./Graphics/Icon";
import Heading from "./Typography/Heading";
import ButtonGroup from "./Buttons/ButtonGroup";
import ImageButton from "./Buttons/ImageButton";

const buttonPreset1 = {
  "bg-color": "bg-pink",
  "bg-color-selected": "bg-green",

  inner: {
    "padding": "p-0",
    "padding-selected": "p-2"
  }
}

const ClientComponent = ({ children }) => {

  const groupClick = (data) => {
    // console.log("group click: ", data);
  }

  const buttonClick = (data) => {
    // console.log("button click: ", data);
  }

  return (
    <div className="p-5">
      <Button preset={buttonPreset1}>
        Button 1
      </Button>

      <Button {...buttonPreset1}>
        Button 2
      </Button>

      <Button
      bg-color="bg-black"
      inner={{
        "padding": "p-0"
      }}>
        Button 3
      </Button>
    </div>
  );
};

export default ClientComponent;