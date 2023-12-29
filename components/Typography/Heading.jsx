// import getStylesFromProps from "@/util/getStylesFromProps";
import { twMerge } from "tailwind-merge";
import { getResponsiveTextSize } from "@/lib/utils/responsiveStyles";

const Heading = ({ 
  children, 
  type,
  textSize,
  className: importedClassName="",
  ...rest
}) => {

  const getHTag = (type, children, props) => {
    switch (type) {
      case "h1": return <h1 {...props}>{children}</h1>
      case "h2": return <h2 {...props}>{children}</h2>
      case "h3": return <h3 {...props}>{children}</h3>
      case "h4": return <h4 {...props}>{children}</h4>
      case "h5": return <h5 {...props}>{children}</h5>
      case "h6": return <h6 {...props}>{children}</h6>
      
      default: return <p {...props}>{children}</p>
    }
  }

  return getHTag(
    type, 
    children, 
    {
      ...rest,
      className: twMerge(
        `${getResponsiveTextSize(textSize)} heading-text leading-6 py-2 text-primary`,
        importedClassName
      )
    }
  );
};

export default Heading;

