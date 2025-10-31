import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import cake from './assets/cake.gif'
import bg from './assets/bg.png'

function App() {
  const [loading, setLoading] = useState(true)
  const [showPinPad, setShowPinPad] = useState(false)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const CORRECT_PIN = '0212'

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleLoginClick = () => {
    setShowPinPad(true)
  }

  const handleNumberClick = (num: number) => {
    if (pin.length < CORRECT_PIN.length && !success) {
      const newPin = pin + num
      setPin(newPin)
      setError('') // clear error while typing

      if (newPin === CORRECT_PIN) {
        setSuccess(true)
        setPin('Welcome') // show welcome in input
        setTimeout(() => {
          navigate('/home')
        }, 800) // brief delay before navigating
        return
      }

      // Wrong PIN handling
      if (newPin.length === CORRECT_PIN.length && newPin !== CORRECT_PIN) {
        setTimeout(() => {
          setPin('')
          setError('Try again')
        }, 300) // brief delay to show last digit
      }
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-linear-to-b from-pink-100 to-white">
        <img
          src={cake}
          alt="Loading cake"
          className="w-40 h-40 object-contain animate-bounce"
        />
        <p className="mt-4 text-pink-600 font-semibold text-lg">Loading...</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-linear-to-b from-pink-100 to-white flex items-center justify-center p-4">
      <img src={bg} alt="background" className="absolute object-cover" />
      <div className="relative z-10 text-center">
        {!showPinPad && (
          <>
            <h3 className="text-lg text-pink-500 font-bold">
              Hey sweetie please click login....
            </h3>
            <button
              onClick={handleLoginClick}
              className="mt-6 px-4 py-2 bg-pink-500 text-white font-semibold rounded-full shadow-lg hover:bg-pink-600 transition duration-300"
            >
              Login
            </button>
          </>
        )}

        {showPinPad && (
          <div className="p-4 mt-4">
            <input
              type="text"
              value={pin}
              placeholder={error ? error : 'Please enter PIN'}
              className={`text-pink-500 font-bold mb-2 border border-pink-300 shadow-sm rounded-lg py-1 px-4 
                ${error ? 'border-red-400 placeholder-red-400' : ''} 
                ${success ? 'text-green-600 border-green-400' : ''}`}
              readOnly
            />

            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num)}
                  className="p-2 bg-pink-200 rounded-lg hover:bg-pink-300 transition"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleNumberClick(0)}
                className="p-2 bg-pink-200 rounded-lg hover:bg-pink-300 transition col-start-2"
              >
                0
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
