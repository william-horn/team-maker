import Image from 'next/image'
import Icon from '@/components/Images/Icon'

export default function Home() {
  return (
    <main>
      <p className="">Hello world</p>
      <Icon
      src="/images/bourbon-pecan.webp"
      width="50vw"
      />
    </main>
  )
}
