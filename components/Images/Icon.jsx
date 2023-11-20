import Image from "next/image"

export default function Icon({ src, width="48px", height, alt, sizes }) {
  height = height || width

  return (
    <div 
    className="icon relative overflow-hidden"
    style={{ width, height }}
    >
      <Image
      fill
      src={src}
      sizes={sizes || "(max-width: 640px) 48px, 100px"}
      alt={alt || "icon alongside text"}
      />
    </div>
  )
}
