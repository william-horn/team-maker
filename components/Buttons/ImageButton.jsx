

import { useState } from "react";
import mergeClass from "@/util/mergeClass";
import Icon from "../Graphics/Icon";
import emptyFunc from "@/util/emptyFunc";
import Button from "./Button";

export default function ImageButton({
  src,
  className: importedClassName={},
  onClick=emptyFunc,
  hoverImage,
  // ...rest
}) {
  const [hovered, setHovered] = useState(false);

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

  className = mergeClass(
    className,
    importedClassName,
    { _isHovered: hovered }
  );

  return (
    <Button
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    className={className}
    onClick={onClick}
    >
      <Icon
      src={className.icon.src || (hovered && hoverImage) || src}
      className={className.icon}
      />
    </Button>
  )
}
