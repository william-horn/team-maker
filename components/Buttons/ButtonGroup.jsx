"use client";

import { useState, useRef } from "react";
import ButtonGroupProvider from "@/providers/ButtonGroupProvider";
import { useButtonGroupContext } from "@/providers/ButtonGroupProvider";
import Button from "./Button";
import emptyFunc from "@/util/emptyFunc";

const GroupButton = ({ 
  children,

  onClick=emptyFunc,
  onSelect=emptyFunc,
  onUnselect=emptyFunc,

  id,
  value,
  
  ...rest
}) => {
  const buttonGroupContext = useButtonGroupContext();

  const {
    groupName,
    onClick: group_onClick,
    mode,
    findActiveId,
    updateActiveIds,
    onSelect: group_onSelect,
    onUnselect: group_onUnselect,
  } = buttonGroupContext;

  if (mode !== "select") {
    throw Error("ButtonGroup.Button components can only be used in <ButtonGroup> with mode='select'");
  } else if (!id) {
    throw Error("ButtonGroup.Button components must be given a unique id prop");
  }

  const initiallySelected = findActiveId(id).found;
  
  const buttonData = { 
    id, 
    value, 
    groupName, 
    isSelected: initiallySelected 
  };

  const fireOnSelect = (...args) => {
    group_onSelect(...args);
    onSelect(...args);
  }

  const fireOnUnselect = (...args) => {
    group_onUnselect(...args);
    onUnselect(...args);
  }

  const buttonClick = () => {
    buttonData.isSelected = !initiallySelected;
    
    group_onClick(buttonData);
    onClick(buttonData);

    if (buttonData.isSelected) {
      fireOnSelect(buttonData);
    } else {
      fireOnUnselect(buttonData);
    }

    updateActiveIds(id, buttonData.isSelected);
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
  onSelect=emptyFunc,
  onUnselect=emptyFunc,

  defaultSelect=[],
  groupName="Button Group",
  mode="select",

  limit=false,
}) => {
  const multipleSelected = Array.isArray(defaultSelect);

  const [activeIds, _setActiveIds] = useState(() => {
    if (!multipleSelected) return [defaultSelect];
    return defaultSelect;
  });

  const formData = useRef([]);

  const findActiveId = (buttonId) => {
    const idIndex = activeIds.findIndex(id => id === buttonId);
    return { found: idIndex !== -1, index: idIndex };
  }
  
  const updateActiveIds = (buttonId, isSelected) => {
    if (isSelected) {
      _setActiveIds(prev => {
        if (multipleSelected) {

          // ? checking to prevent duping button ids in react strict mode
          if (!prev.some(id => id === buttonId)) {
            prev.push(buttonId);
            return [...prev];
          }

        } else {
          prev[0] = buttonId;
          return [...prev];
        }

        return prev;
      });
      
    } else {
      _setActiveIds(prev => {
        const idResult = findActiveId(buttonId);

        // ? checking to prevent duping button ids in react strict mode
        if (idResult.found) {
          prev.splice(idResult.index, 1);
          return [...prev];
        }

        return prev;
      });
    }
  }

  return (
    <ButtonGroupProvider
    value={{
      onClick,
      groupName,
      mode,
      findActiveId,
      updateActiveIds,
      onSelect,
      onUnselect,
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