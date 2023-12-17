

import { useState } from "react";
import mergeClass from "@/util/mergeClass";
import Icon from "../Graphics/Icon";
import emptyFunc from "@/util/emptyFunc";
import { StatefulButton, StatelessButton } from "./Buttons";

let className = {
  // button styles
  self: "p-0",

  inner: {
    self: "p-1"
  },

  // icon styles
  icon: {
    self: "",
  }
};

export const StatelessImageButton = function({
  children,

  className: importedClassName={},
  state: importedState={},
  onClick=emptyFunc,

  src,
  srcHovered,
  srcSelected,

  ...rest
}) {
  className = mergeClass(
    className,
    importedClassName,
  );

  return (
    <StatelessButton
    className={className}
    onClick={onClick}
    {...rest}>
      <Icon
      src={
        className.icon.src 
          || (importedState.__selected && srcSelected) 
          || (importedState.__hovered && srcHovered)
          || src
      }
      className={className.icon}
      />
    </StatelessButton>
  )
}

export const StatefulImageButton = function({
  children,
  defaultSelect=false,
  onClick=emptyFunc,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(defaultSelect);

  const processClick = () => {
    const isSelected = !selected;
    setSelected(isSelected);
    onClick(isSelected);
  }

  return (
    <StatelessImageButton
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onClick={processClick}
    state={{__hovered: hovered, __selected: selected}}
    {...rest}
    />
  )
}
