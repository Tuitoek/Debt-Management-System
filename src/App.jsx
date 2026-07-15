import { useState } from 'react'
import LandingHero from './components/LandingHero'
import SalaryCalculator from './components/SalaryCalculator'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <LandingHero />
<SalaryCalculator />
    </div>

)
}

export default App
