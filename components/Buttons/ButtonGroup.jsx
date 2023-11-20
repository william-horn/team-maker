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
    findButtonId,
    buttonIdList,
    onSelect: group_onSelect,
    onUnselect: group_onUnselect,
  } = buttonGroupContext;

  if (mode !== "select") {
    throw Error("ButtonGroup.Button components can only be used in <ButtonGroup> with mode='select'");
  } else if (!id) {
    throw Error("ButtonGroup.Button components must be given a unique id prop");
  } else if (findButtonId(id).found) {
    throw Error("ButtonGroup.Button must have a unique id, '" + id + "' already exists.");
  }

  buttonIdList.push(id);
  const isSelected = findActiveId(id).found;
  
  const buttonData = { 
    id, 
    value, 
    groupName, 
    isSelected
  };

  const fireOnSelect = (...args) => {
    group_onSelect(...args);
    onSelect(...args);
  }

  const fireOnUnselect = (...args) => {
    group_onUnselect(...args);
    onUnselect(...args);
  }

  const buttonClick = (_systemButtonData) => {
    buttonData.isSelected = !isSelected;
    _systemButtonData.buttonGroup = buttonData;

    /*
    button state must be updated before handlers are fired, so that the
    handlers have access to the new updated state values.
    */
    _systemButtonData.updateState({ 
      selected: buttonData.isSelected 
    });
    
    group_onClick(_systemButtonData);
    onClick(_systemButtonData);

    if (buttonData.isSelected) {
      fireOnSelect(_systemButtonData);
    } else {
      fireOnUnselect(_systemButtonData);
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

  const buttonIdList = [];
  const formData = useRef([]);

  const findButtonId = (buttonId) => {
    const idIndex = buttonIdList.findIndex(id => id === buttonId);
    return { found: idIndex !== -1, index: idIndex }
  }

  const findActiveId = (buttonId) => {
    const idIndex = activeIds.findIndex(id => id === buttonId);
    return { found: idIndex !== -1, index: idIndex };
  }
  
  const updateActiveIds = (buttonId, isSelected) => {
    if (isSelected) {
      _setActiveIds(prev => {
        prev.push(buttonId);
        return [...prev];
      });

    } else {
      const idResult = findActiveId(buttonId);
      
      _setActiveIds(prev => {
        prev.splice(idResult.index, 1);
        return [...prev];
      });
    }
  }

  return (
    <ButtonGroupProvider
    value={{
      onClick,
      groupName,
      mode,
      findButtonId,
      findActiveId,
      updateActiveIds,
      onSelect,
      buttonIdList,
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