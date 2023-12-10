import Image from "next/image"
import getStylesFromProps from "@/util/getStylesFromProps"

const className = {
  "relative": true,
  "overflow-hidden": true,
  "inline-block": true,
  "custom-icon": true,
  "invert": true,

  "width": "w-5",
  "height": "h-5",
}

const Icon = ({
  src, 
  alt, 
  utility=false,
  preset,
  ...rest
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

  const styles = getStylesFromProps(
    className,
    preset || {...rest},
    state
  );

  return (
    <span 
    className={styles.self}
    >
      <Image
      className={styles.image.self}
      fill
      src={src}
      sizes={
        utility
          ? "(min-width: 1024px) 192px, (min-width: 640px) 96px, 48px"
          : "(min-width: 1024px) 512px, (min-width: 640px) 256px, 128px"
      }
      alt={alt || "icon alongside text"}
      />
    </span>
  )
}

export default Icon