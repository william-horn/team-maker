// import getStylesFromProps from "@/util/getStylesFromProps";
import mergeClass from "@/util/mergeClass";

const Heading = ({ 
  children, 
  className: importedClassName={},
}) => {
  
  // todo: adapt line height to text size
  const className = mergeClass({
    self: "custom-heading leading-6 py-2 text-primary text-lg"
  }, importedClassName);

  return (
    <h2 
    className={className.self}>
      {children}
    </h2>
  );
};

export default Heading;

