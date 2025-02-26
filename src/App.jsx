import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SideBar from './Components/SideBar/SideBar'
import Main from './Components/Main/Main'
import runChat from './Config/gemini'

function App() {
  const [count, setCount] = useState(0)
  runChat("Hey Gemini how are you")
  return (
    <>

      <SideBar/>
      <Main/>
    </>
  )
}

export default App
