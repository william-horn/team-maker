
import '../globals.css'
import Wireframe from '@/components/Wireframe'

const RootLayout = function({ children }) {
  return (
    <html lang="en">
      <Wireframe/>
      <head>
        <title>My Custom Components</title>
        <link rel="icon" type="image/x-icon" href="/images/logo3-128.png"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Titan+One&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Paytone+One&family=Titan+One&display=swap" rel="stylesheet"/>
      </head>
      <body className="theme-default bg-landing-page">
        {children}
      </body>
    </html>
  )
}

export default RootLayout;