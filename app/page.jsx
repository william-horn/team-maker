import Image from 'next/image'
import Icon from '@/components/Graphics/Icon'

export default function Home() {
  return (
    <main>
      <p className="">Hello world</p>

      {/* Testing utility icon responsiveness  */}
      <Icon
      src="/images/utility-icon-test.svg"
      utility
      self_className="w-[48px] h-[48px] sm:w-[96px] sm:h-[96px] lg:w-[192px] lg:h-[192px]"
      />

      {/* Testing decorative icon responsiveness  */}
      <Icon
      src="/images/decorative-icon-test.webp"
      self_className="w-[128px] h-[128px] sm:w-[256px] sm:h-[256px] lg:w-[512px] lg:h-[512px]"
      />
    </main>
  )
}
