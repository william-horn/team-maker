"use client";

import ButtonGroupProvider from "@/providers/ButtonGroupProvider";
import { useButtonGroupContext } from "@/providers/ButtonGroupProvider";
import Button from "./Button";
import emptyFunc from "@/util/emptyFunc";

const GroupButton = ({ 
  children,
  onClick=emptyFunc,
  option="default",
  ...rest
}) => {
  const buttonGroupContext = useButtonGroupContext();

  const {
    groupName,
    onClick: groupClick
  } = buttonGroupContext;

  const buttonData = {
    groupName,
    option,
  }

  const buttonClick = () => {
    groupClick(buttonData);
    onClick(buttonData);
  }

  return (
    <Button onClick={buttonClick} {...rest}>
      {children}
    </Button>
  )
}

const ButtonGroup = ({ 
  children,

  // handlers
  onClick=emptyFunc,

  groupName="Button Group",
  mode="select",

  limit=false,
}) => {

  return (
    <ButtonGroupProvider
    value={{
      onClick,
      groupName,
      mode,
    }}
    >
      <div className="flex custom-button-group">
        {children}
      </div>
    </ButtonGroupProvider>
  );
};

ButtonGroup.Button = GroupButton;

export default ButtonGroup;