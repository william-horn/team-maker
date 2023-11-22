

import Icon from "../Graphics/Icon";
import Button from "./Button";

export default function ImageButton({
  src,
  width,
  height,
  filter,
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
      width={width}
      height={height}
      filter={filter}
      />
    </Button>
  )
}
