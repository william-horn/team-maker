

import Icon from "../Graphics/Icon";
import Button from "./Button";

export default function ImageButton({
  src,
  className,
  ...rest
}) {
  return (
    <Button
    outerPadding="p-0"
    innerPadding="p-1"
    noBackground
    {...rest}
    >
      <Icon
      src={src}
      className={className}
      />
    </Button>
  )
}
