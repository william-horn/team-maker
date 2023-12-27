import Image from 'next/image'



/*
  This is the home page component, meaning it should remain a server-side component. Therefore,
  for button-testing purposes, we must create a client component that handles the interactivity logic
  between the user and the button, and nest the button in said client component.
*/
// import Button from '@/components/Buttons/Button'
// import ClientComponent from '@/components/ClientComponent'
import SingleComponent from '@/components/SingleComponent'

export default function Home() {
  console.log("PROCESS ENV: ", process.env);
  console.log("MY KEY: ", process.env.MY_TEST_VAR);

  return (
    <main>
      <SingleComponent/>
    </main>
  )
}
