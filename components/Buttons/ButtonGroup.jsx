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

  preset,
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
    _activeIds,
    selectionLimit,
    onSelect: group_onSelect,
    onUnselect: group_onUnselect,
    rightIconSelected,
    rightIconUnselected,
    leftIconUnselected,
    leftIconSelected,
    buttonPreset: group_preset,
  } = buttonGroupContext;

  if (!id) {
    throw Error("ButtonGroup.Button components must be given a unique id prop");
  } else if (findButtonId(id).found) {
    throw Error("ButtonGroup.Button must have a unique id, '" + id + "' already exists.");
  }

  mode = mode || group_mode;

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

    if (selectionLimit > -1 && _activeIds.length >= selectionLimit && buttonData.isSelected) {
      if (unselectLastChoice) {
        const unselectedButtonId = _activeIds[_activeIds.length - 1];

        if (unselectedButtonId !== buttonData.id) {
          const unselectedButtonData = selectionReport.current[unselectedButtonId] || { error: "no data" };
          unselectedButtonData.isSelected = false;
          
          fireOnUnselect(unselectedButtonData);
          updateActiveIds(unselectedButtonId, unselectedButtonData.isSelected);
        }

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

    updateActiveIds(buttonData.id, buttonData.isSelected);
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
          state={{ _isSelected: isSelected }}
          preset={(group_preset && preset) ? {...group_preset, ...preset} : group_preset || preset}
          {...rest}
          >
            {children}
          </Button>
        );

      case "checkbox":

        return (
          <span>
            <Text inline>{children}</Text>
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

  buttonPreset,
  rightIconSelected,
  rightIconUnselected,
  leftIconUnselected,
  leftIconSelected,
}) {
  const [_activeIds, _setActiveIds] = useState(defaultSelect);

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
    const idIndex = _activeIds.findIndex(id => id === buttonId);
    return { found: idIndex !== -1, index: idIndex };
  }
  
  const updateActiveIds = (id, isSelected) => {
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
      _activeIds,
      onSelect,
      unselectLastChoice,
      onSelectionLimitReached,
      buttonIdList,
      onUnselect,
      rightIconSelected,
      rightIconUnselected,
      leftIconUnselected,
      leftIconSelected,
      buttonPreset,
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