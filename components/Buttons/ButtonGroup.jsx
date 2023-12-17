"use client";

import mergeClass from "@/util/mergeClass";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import ButtonGroupProvider from "@/providers/ButtonGroupProvider";
import emptyFunc from "@/util/emptyFunc";

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
  selectionLimit=-1,

  state={},

  ...rest
}) {

  // Button group styles
  let className = {
    self: "flex flex-col gap-2 custom-button-group",

    buttons: {
      self: "",
      __groupSelected: {
        self: "bg-blue-500 hover:bg-blue-400"
      }
    },
  }

  // Button group state (active buttons)
  const [activeIds, setActiveIds] = useState(defaultSelect);
  const registeredIds = useRef({});
  const groupButtonData = useRef({});

  className = mergeClass(
    className,
    importedClassName,
  );

  if (selectionLimit > -1 && defaultSelect.length > selectionLimit) {
    throw Error("In <ButtonGroup>: Initially selected options '[" + defaultSelect + "]' cannot exceed selection limit of '" + selectionLimit + "'");
  }

  const findActiveId = (id) => {
    const idIndex = activeIds.findIndex(activeId => activeId === id);
    return { found: idIndex !== -1, index: idIndex };
  }
  
  const updateActiveIds = (id, isActive) => {
    if (isActive) {
      setActiveIds(prev => {
        prev.push(id);
        return [...prev];
      });

    } else {
      const idResult = findActiveId(id);
      
      setActiveIds(prev => {
        prev.splice(idResult.index, 1);
        return [...prev];
      });
    }
  }

  useEffect(() => {
    // console.log("active: ", activeIds);
    // console.log("data: ", groupButtonData.current);
    // console.log("registered: ", registeredIds.current);

    const invalidId = defaultSelect.find(id => !registeredIds.current[id]);

    if (invalidId) {
      throw Error(`Id '${invalidId}' found in 'defaultSelect[]' prop but not in children`);
    }
  });

  return (
    <ButtonGroupProvider
    value={{
      onClick,
      selectionLimit,
      findActiveId,
      updateActiveIds,
      activeIds,
      onSelect,
      unselectLastChoice,
      onSelectionLimitReached,
      onUnselect,
      registeredIds,
      groupButtonData,
      className,
      state,
      rest
    }}
    >
      <div className={className.self}>
        {children}
      </div>
    </ButtonGroupProvider>
  );
};

export default ButtonGroup;