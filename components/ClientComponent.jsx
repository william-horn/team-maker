"use client";

import Button from "./Buttons/Button";
import Text from "./Typography/Text";
import Icon from "./Graphics/Icon";
import Heading from "./Typography/Heading";
import ButtonGroup from "./Buttons/ButtonGroup";
import ImageButton from "./Buttons/ImageButton";

const buttonPreset1 = {
  "bg-color": "",
  "bg-opacity": "",
  "bg-color-selected": "",
  "bg-opacity-selected": "",
  "bg-color-hover": "",
  "bg-opacity-hover": "",
  "align-items": true,

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
        Button
      </Button>

      <Button {...buttonPreset1}>
        Button
      </Button>

      <Button
      bg-color="bg-black"
      inner={{
        "padding": "p-0"
      }}
      >

      </Button>
    </div>
  );
};

export default ClientComponent;