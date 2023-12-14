
import mergeClass from "@/util/mergeClass";
import React from "react";

const Text = React.forwardRef(function({ 
  children, 
  className: importedClassName={},
  ...rest
}, ref) {

  const className = mergeClass({
    self: "custom-text leading-6 text-white align-middle text-sm block"
  }, importedClassName);

  // todo: adapt line height to text size

  return (
    <p 
    ref={ref}
    className={className.self}
    {...rest}>
      {children}
    </p>
  );
});

Text.displayName = "Text"; // for ESlint
export default Text;

