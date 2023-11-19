"use client";

import ButtonGroupProvider from "@/providers/ButtonGroupProvider";
import { useButtonGroupContext } from "@/providers/ButtonGroupProvider";
import Button from "./Button";
import emptyFunc from "@/util/emptyFunc";

const GroupButton = ({ children }) => {
  const buttonContext = useButtonGroupContext();

  return <Button>{children}</Button>
}

const ButtonGroup = ({ 
  children,

  // handlers
  onClick=emptyFunc,
}) => {

  return (
    <ButtonGroupProvider
    value={{
      
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