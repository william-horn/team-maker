// import getStylesFromProps from "@/util/getStylesFromProps";
import mergeClass from "@/util/mergeClass";

// const className = {
//   "custom-text": true,
//   "line-height": "leading-6",
//   "padding": "py-3",
//   "text-color": "text-white",
//   "text-size": "text-sm",
// }

const Heading = ({ 
  children, 
  className: importedClassName={},
  // preset,
  // ...rest
}) => {
  // const styles = getStylesFromProps(
  //   className,
  //   preset || {...rest}
  // );
  // todo: adapt line height to text size
  const className = mergeClass({
    self: "custom-heading leading-6 py-2 text-white text-lg"
  }, importedClassName);

  return (
    <h2 
    className={className.self}>
      {children}
    </h2>
  );
};

export default Heading;

