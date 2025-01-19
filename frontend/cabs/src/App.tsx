import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CabBooking } from './pages/CabBooking'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CabBooking></CabBooking>
    </>
  )
}

export default App
