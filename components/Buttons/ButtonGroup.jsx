"use client";

import { useState, useRef, useEffect } from "react";
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
    onSelectionLimitReached,
    unselectLastChoice,
    buttonIdList,
    selectionReport,
    activeIds,
    selectionLimit,
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

  const buttonClick = () => {
    buttonData.isSelected = !isSelected;

    if (selectionLimit > -1 && activeIds.length >= selectionLimit && buttonData.isSelected) {
      if (unselectLastChoice) {
        const unselectedButtonId = activeIds.pop(); // not best practice?
        const unselectedButtonData = selectionReport.current[unselectedButtonId];
        fireOnUnselect(unselectedButtonData);

      } else {
        onSelectionLimitReached(buttonData);
        return;
      }
    }

    group_onClick(buttonData);
    onClick(buttonData);

    if (buttonData.isSelected) {
      fireOnSelect(buttonData);
    } else {
      fireOnUnselect(buttonData);
    }

    updateActiveIds(buttonData);
  }

  if (isSelected) {
    selectionReport.current[id] = buttonData;
  } else {
    delete selectionReport.current[id];
  }

  return (
    <Button 
    rightIcon={`/icons/checkbox_${isSelected ? 'selected' : 'unselected'}.svg`}
    onClick={buttonClick} 
    {...rest}
    >
      {children}
    </Button>
  )
}

const ButtonGroup = function({ 
  children,

  // handlers
  onClick=emptyFunc,
  onSelect=emptyFunc,
  onUnselect=emptyFunc,
  onSelectionLimitReached=emptyFunc,

  unselectLastChoice=false,

  defaultSelect=[],
  groupName="Button Group",
  mode="select",

  selectionLimit=-1,
}) {
  const multipleSelected = Array.isArray(defaultSelect);

  const [activeIds, _setActiveIds] = useState(() => {
    if (!multipleSelected) return [defaultSelect];
    return defaultSelect;
  });

  const buttonIdList = [];
  const selectionReport = useRef({});

  const findButtonId = (buttonId) => {
    const idIndex = buttonIdList.findIndex(id => id === buttonId);
    return { found: idIndex !== -1, index: idIndex }
  }

  const findActiveId = (buttonId) => {
    const idIndex = activeIds.findIndex(id => id === buttonId);
    return { found: idIndex !== -1, index: idIndex };
  }
  
  const updateActiveIds = (buttonData) => {
    const { id, isSelected } = buttonData;
    
    if (isSelected) {
      _setActiveIds(prev => {
        prev.push(id);
        return [...prev];
      });

    } else {
      const idResult = findActiveId(id);
      
      _setActiveIds(prev => {
        prev.splice(idResult.index, 1);
        return [...prev];
      });
    }
  }

  useEffect(() => {
    console.log("selection report: ", selectionReport.current);
  })

  return (
    <ButtonGroupProvider
    value={{
      onClick,
      groupName,
      mode,
      selectionLimit,
      findButtonId,
      selectionReport,
      findActiveId,
      updateActiveIds,
      activeIds,
      onSelect,
      unselectLastChoice,
      onSelectionLimitReached,
      buttonIdList,
      onUnselect,
    }}
    >
      <div className="flex flex-col gap-2 custom-button-group">
        {children}
      </div>
    </ButtonGroupProvider>
  );
};

ButtonGroup.Button = GroupButton;

export default ButtonGroup;