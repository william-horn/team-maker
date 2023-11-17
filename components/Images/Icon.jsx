import Image from "next/image"

export default function Icon({ src, width=48, height, alt }) {
  return (
    <div className="icon">
      <Image
      src={src}
      width={width}
      height={height || width}
      alt={alt || "icon alongside text"}
      />
    </div>
  )
}
