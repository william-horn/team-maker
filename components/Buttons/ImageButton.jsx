

// import {
//   applyPresetStyles
// } from "@/util/getStylesFromProps";

import mergeClass from "@/util/mergeClass";
import Icon from "../Graphics/Icon";
import emptyFunc from "@/util/emptyFunc";
import Button from "./Button";

// const className = {
//   "padding": "p-0",

//   inner: {
//     "padding": "p-1",
//   },

//   // extensions here cannot exist inside the button component className or they will merge
//   _image: {
//     // icon preset settings
//   }
// }

export default function ImageButton({
  src,
  className: importedClassName={},
  onClick=emptyFunc,
  // ...rest
}) {
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
    importedClassName
  );

  return (
    <Button
    className={className}
    onClick={onClick}
    >
      <Icon
      src={src}
      className={className.icon}
      />
    </Button>
  )
}
