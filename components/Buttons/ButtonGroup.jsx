"use client";

import { useState, useRef, useEffect } from "react";
import ButtonGroupProvider from "@/providers/ButtonGroupProvider";
import { useButtonGroupContext } from "@/providers/ButtonGroupProvider";
import Button from "./Button";
import emptyFunc from "@/util/emptyFunc";
import Text from "../Typography/Text";
import ImageButton from "./ImageButton";

const GroupButton = ({ 
  children,
  mode,

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
    mode: group_mode,
    onClick: group_onClick,
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
    rightIconSelected,
    rightIconUnselected,
    leftIconUnselected,
    leftIconSelected,
  } = buttonGroupContext;

  if (!id) {
    throw Error("ButtonGroup.Button components must be given a unique id prop");
  } else if (findButtonId(id).found) {
    throw Error("ButtonGroup.Button must have a unique id, '" + id + "' already exists.");
  }

  buttonIdList.push(id);
  mode = mode || group_mode;
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
        const unselectedButtonData = selectionReport.current[unselectedButtonId] || { error: "no data" };
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

  const renderButton = () => {
    switch (mode) {
      case "select":

        return (
          <Button 
          rightIcon={isSelected ? rightIconSelected : rightIconUnselected}
          leftIcon={isSelected ? leftIconSelected : leftIconUnselected}
          onClick={buttonClick} 
          {...rest}>
            {children}
          </Button>
        );

      case "checkbox":

        return (
          <span className="flex items-center">
            <Text inline>
              {children} 
            </Text>
            <ImageButton 
            onClick={buttonClick} 
            src={isSelected ? "/icons/checkbox_selected.svg" : "/icons/checkbox_unselected.svg"}
            filter="invert" 
            inline
            />
          </span>
        );
    }
  } 

  return renderButton();
}

const ButtonGroup = function({ 
  children,

  // handlers, global
  onClick=emptyFunc,
  onSelect=emptyFunc,
  onUnselect=emptyFunc,
  onSelectionLimitReached=emptyFunc,

  // global
  unselectLastChoice=false,
  defaultSelect=[],
  groupName="Button Group",
  selectionLimit=-1,
  mode="select",

  rightIconSelected,
  rightIconUnselected,
  leftIconUnselected,
  leftIconSelected,
}) {
  const [activeIds, _setActiveIds] = useState(defaultSelect);

  if (selectionLimit > -1 && defaultSelect.length > selectionLimit) {
    throw Error("In <ButtonGroup>: Initially selected options '[" + defaultSelect + "]' cannot exceed selection limit of '" + selectionLimit + "'");
  }

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
      rightIconSelected,
      rightIconUnselected,
      leftIconUnselected,
      leftIconSelected,
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