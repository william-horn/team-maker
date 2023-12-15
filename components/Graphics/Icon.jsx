import Image from "next/image"
import mergeClass from "@/util/mergeClass"

const Icon = ({
  src, 
  alt, 
  utility=false,
  className: importedClassName={},
  // preset,
  // ...rest
}) => {

  /* 
  TODO: 
  
  Increase utility icon sizes at different breakpoints. In the meantime just use 48px
  as a constant. Ideally, new utility icon downloads should come in at the same time as the 
  rendered icon breakpoint.

  notes:
  *All original utility icons should have an initial resolution of 192px
  *All decorative icons should have an initial resolution of 512px

  Utility icon breakpoints:
    - sm: 48px 
    - md: 96px
    - lg: 192px

  Decorative icon breakpoints:
    - sm: 128px
    - md: 256px
    - lg: 512px

  Create the icon image in the maximum resolution that can be used. The download size and
  quality of the image will change based on breakpoints.
  */

  // const styles = getStylesFromProps(
  //   className,
  //   [preset, {...rest}],
  // );

  let className = {
    self: "relative overflow-hidden inline-block align-middle min-w-[1.25rem] min-h-[1.25rem] w-5 h-5",

    image: {
      self: "invert"
    }
  };

  className = mergeClass(
    className,
    importedClassName
  );

  return (
    src
      ? <span 
          className={className.self}>
            <Image
            className={className.image.self}
            fill
            src={className.src || src}
            sizes={
              utility
                ? "(min-width: 1024px) 192px, (min-width: 640px) 96px, 48px"
                : "(min-width: 1024px) 512px, (min-width: 640px) 256px, 128px"
            }
            alt={alt || "icon alongside text"}
            />
          </span>
        : <></>
  )
}

export default Icon