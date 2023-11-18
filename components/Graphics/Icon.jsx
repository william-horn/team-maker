import Image from "next/image"

const Icon = ({
  src, 
  width, 
  height, 
  alt, 
  utility=false,
  self_className=""
}) => {
  height = height || width

  /* 
  TODO: 
  
  Increase utility icon resolution at different breakpoints. In the meantime just use 48px
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

  return (
    <div 
    className={"relative overflow-hidden icon w-[48px] h-[48px] " + self_className}
    style={{ width, height }}
    >
      <Image
      fill
      src={src}
      sizes={
        utility ? 
          "(min-width: 1024px) 192px, (min-width: 640px) 96px, 48px"
          : "(min-width: 1024px) 512px, (min-width: 640px) 256px, 128px"
      }
      alt={alt || "icon alongside text"}
      />
    </div>
  )
}

export default Icon