"use client";

import mergeClass from "@/util/mergeClass";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import Providers from "@/providers/Providers";
import emptyFunc from "@/util/defaultFunctions";

const ButtonGroup = function({ 
  children,
  className: importedClassName={},
  state: importedState={},

  // handlers, global
  onClick=emptyFunc,
  onSelect=emptyFunc,
  onUnselect=emptyFunc,
  onSelectionLimitReached=emptyFunc,

  // global
  unselectLastChoice=false,
  defaultSelect=[],
  selectionLimit=-1,

  ...rest
}) {

  // Button group styles
  let className = {
    self: "flex flex-col gap-2 custom-button-group",

    buttons: {
      self: "",
      __groupSelected: {
        self: "bg-green-500 hover:bg-green-400"
      }
    },
  }

  className = mergeClass(
    className,
    importedClassName,
  );

  // Button group state (active buttons)
  const [activeIds, setActiveIds] = useState(defaultSelect);
  const registeredIds = useRef({});
  const activeData = useRef({});

  // catch default selected buttons being greater than the selection limit
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
        if (!prev.find(_id => _id === id)) {
          prev.push(id);
        }
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
    console.log("active: ", activeIds);
    console.log("data: ", activeData.current);
    console.log("registered: ", registeredIds.current);
  });

  useEffect(() => {
    const invalidId = defaultSelect.find(id => !registeredIds.current[id]);

    if (invalidId) {
      throw Error(`Id '${invalidId}' found in 'defaultSelect[]' prop but not in children`);
    }
  }, [defaultSelect]);

  return (
    <Providers.ButtonGroup
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
      activeData,
      className,
      importedState,
      rest
    }}
    >
      <div className={className.self}>
        {children}
      </div>
    </Providers.ButtonGroup>
  );
};

export default ButtonGroup;