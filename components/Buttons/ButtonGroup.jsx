"use client";


import mergeClass from "@/util/mergeClass";
import { useState, useRef, useEffect } from "react";
import ButtonGroupProvider from "@/providers/ButtonGroupProvider";
import { useButtonGroupContext } from "@/providers/ButtonGroupProvider";
// import { useFormContext } from "@/providers/FormProvider";
import Button from "./Button";
import emptyFunc from "@/util/emptyFunc";
import Text from "../Typography/Text";
import ImageButton from "./ImageButton";

const GroupButton = ({ 
  children,
  className: importedClassName={},
  mode,

  onClick=emptyFunc,
  onSelect=emptyFunc,
  onUnselect=emptyFunc,

  id,
  ...rest
}) => {
  const buttonGroupContext = useButtonGroupContext();

  if (!buttonGroupContext) {
    throw Error("ButtonGroup.Button can only be used inside a <ButtonGroup> component.");
  }

  const {
    groupName,
    mode: group_mode,
    onClick: group_onClick,
    findActiveItemById,
    updateActiveItems,
    itemData,
    onSelectionLimitReached,
    unselectLastChoice,
    _activeItems,
    selectionLimit,
    onSelect: group_onSelect,
    onUnselect: group_onUnselect,
    rightIconSelected,
    rightIconUnselected,
    leftIconUnselected,
    leftIconSelected,
    className: group_className,
  } = buttonGroupContext;

  // todo: throw error if button id already exists
  if (!id) {
    throw Error("ButtonGroup.Button components must be given a unique id prop");
  }

  mode = mode || group_mode;
  const isSelected = findActiveItemById(id).found;
  
  const buttonData = { 
    ...itemData[id],
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

    if (selectionLimit > -1 && _activeItems.length >= selectionLimit && buttonData.isSelected) {
      if (unselectLastChoice) {
        const unselectedButtonData = _activeItems[_activeItems.length - 1];

        if (unselectedButtonData.id !== buttonData.id) {
          unselectedButtonData.isSelected = false;
          
          fireOnUnselect(unselectedButtonData);
          updateActiveItems(unselectedButtonData);
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

    updateActiveItems(buttonData);
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
          className={mergeClass(group_className.selectButton, importedClassName)}
          {...rest}
          >
            {children}
          </Button>
        );

      case "checkbox":
        const checkboxClass = mergeClass(
          group_className.checkboxButton, 
          importedClassName, 
          { _isSelected: isSelected 
        });

        return (
          <span className={checkboxClass.self}>
            <Text className={checkboxClass.text}>{children}</Text>
            <ImageButton 
            className={checkboxClass.imageButton}
            onClick={buttonClick}
            src={isSelected ? "/icons/checkbox_selected.svg" : "/icons/checkbox_unselected.svg"}/>
          </span>
        );
    }
  } 

  return renderButton();
}

const ButtonGroup = function({ 
  children,
  className: importedClassName,

  // handlers, global
  onClick=emptyFunc,
  onSelect=emptyFunc,
  onUnselect=emptyFunc,
  onSelectionLimitReached=emptyFunc,

  // global
  unselectLastChoice=false,
  defaultSelect=[],
  itemData={},
  groupName="Button Group",
  formName="buttonGroup",
  selectionLimit=-1,
  mode="select",

  rightIconSelected,
  rightIconUnselected,
  leftIconUnselected,
  leftIconSelected,
}) {

  // mutate itemData object to include id within metadata object
  for (let key in itemData) itemData[key].id = key;

  // Button group styles
  let className = {
    self: "flex flex-col gap-2 custom-button-group",

    selectButton: {
      self: ""
    },

    checkboxButton: {
      self: "",
      text: { self: "inline" },
      imageButton: { self: "bg-transparent hover:bg-transparent" },
    },
  }

  className = mergeClass(
    className,
    importedClassName,
  );

  // Button group state (active buttons)
  const [_activeItems, _setActiveItems] = useState(defaultSelect.map(id => itemData[id]));

  if (selectionLimit > -1 && defaultSelect.length > selectionLimit) {
    throw Error("In <ButtonGroup>: Initially selected options '[" + defaultSelect + "]' cannot exceed selection limit of '" + selectionLimit + "'");
  }

  const findActiveItemById = (id) => {
    const idIndex = _activeItems.findIndex(data => data.id === id);
    return { found: idIndex !== -1, index: idIndex };
  }
  
  const updateActiveItems = (buttonData) => {
    if (buttonData.isSelected) {
      _setActiveItems(prev => {
        prev.push(buttonData);
        return [...prev];
      });

    } else {
      const idResult = findActiveItemById(buttonData.id);
      
      _setActiveItems(prev => {
        prev.splice(idResult.index, 1);
        return [...prev];
      });
    }
  }

  // useEffect(() => {
  //   console.log("data: ", _activeItems);
  // });

  return (
    <ButtonGroupProvider
    value={{
      onClick,
      groupName,
      mode,
      selectionLimit,
      itemData,
      findActiveItemById,
      updateActiveItems,
      _activeItems,
      onSelect,
      unselectLastChoice,
      onSelectionLimitReached,
      onUnselect,
      rightIconSelected,
      rightIconUnselected,
      leftIconUnselected,
      leftIconSelected,
      className,
    }}
    >
      <div className={className.self}>
        {children}
      </div>
    </ButtonGroupProvider>
  );
};

ButtonGroup.Button = GroupButton;

export default ButtonGroup;