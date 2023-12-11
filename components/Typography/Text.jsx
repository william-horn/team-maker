
// import getStylesFromProps from "@/util/getStylesFromProps";
import mergeClass from "@/util/mergeClass";

// const className = {
//   "custom-text": true,
//   "line-height": "leading-6",
//   "text-color": "text-white",
//   "align-middle": true,
//   "text-size": "text-sm",
//   "block": true,
// }

const Text = ({ 
  children, 
  className: importedClassName={},
  // preset,
  // ...rest
}) => {
  // const styles = getStylesFromProps(
  //   className,
  //   preset || {...rest}
  // );

  const className = mergeClass({
    self: "custom-text leading-6 text-white align-middle text-sm block"
  }, importedClassName);

  // todo: adapt line height to text size

  return (
    <p 
    className={className.self}>
      {children}
    </p>
  );
};

export default Text;

