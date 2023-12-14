
import ImageButton from "./ImageButton";
import Text from "../Typography/Text";

const Quantifier = function({
  children,
  defaultValue,
  increment,
  upperLimit,
  lowerLimit,
}) {
  return (
    <div className="flex items-center gap-2 w-fit">
      <ImageButton
      src="/icons/plus_icon.svg"
      />
      <Text>{defaultValue}</Text>
      <ImageButton
      src="/icons/minus_icon.svg"
      />
    </div>
  );
};

export default Quantifier;