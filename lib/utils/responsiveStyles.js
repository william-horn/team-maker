
const responsiveTextSizes = {
  "3xl": "xl:text-3xl lg:text-3xl md:text-2xl sm:text-2xl text-2xl",
  "2xl": "xl:text-2xl lg:text-2xl md:text-xl sm:text-xl text-xl",
  "xl": "xl:text-xl lg:text-xl text-lg",
  "lg": "xl:text-lg lg:text-lg md:text-md",
  "md": "text-md",
  "sm": "text-sm",
  "xs": "text-xs"
}

const responsiveContainerWidths = {
  "max": "w-full",
  "xl": "w-full xl:w-[95%] lg:w-[95%] md:w-[97%] sm:w-[97%]",
  "lg": "w-full xl:w-[88%] lg:w-[88%] md:w-[92%] sm:w-[92%]",
  "md": "w-full xl:w-[75%] lg:w-[80%] md:w-[85%] sm:w-[92%]",
  "sm": "w-full xl:w-[60%] lg:w-[65%] md:w-[70%] sm:w-[80%]",
  "xs": "w-full xl:w-[45%] lg:w-[55%] md:w-[70%] sm:w-[80%]",
}

export const getResponsiveTextSize = (textSize) => {
  return responsiveTextSizes[textSize];
}

export const getResponsiveContainerWidth = (width) => {
  return responsiveContainerWidths[width];
}