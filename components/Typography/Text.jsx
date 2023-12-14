
import mergeClass from "@/util/mergeClass";
import React from "react";

const Text = React.forwardRef(({ 
  children, 
  className: importedClassName={},
  ...rest
}, ref) => {

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

export default Text;

