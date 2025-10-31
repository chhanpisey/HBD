import confetti from 'canvas-confetti'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'

function Home() {
  const [activeSection, setActiveSection] = useState<'profile' | 'gallery' | 'wishes' | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [, setClosingPopup] = useState(false)

  const groupImages = [
    './src/assets/pf1.JPG',
    './src/assets/pf2.JPG',
    './src/assets/pf.JPG',
  ]

  useEffect(() => {
    const heart = confetti.shapeFromPath({
      path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
    })

    confetti({
      shapes: [heart],
      colors: ['#F472B6', '#EC4899', '#DB2777', '#BE185D'],
    })
  }, [])

  const toggleSection = (section: 'profile' | 'gallery' | 'wishes') => {
    setActiveSection((prev) => (prev === section ? null : section))
  }
  const handleClose = () => {
    // start closing animation
    setClosingPopup(true)

    // wait for animation to finish before removing from DOM
    setTimeout(() => {
      setShowPopup(false)
      setClosingPopup(false)
    }, 400) // duration should match your CSS slide-down animation
  }

  // 🎉 Clean collect handler
  const handleCollect = () => {
    setShowPopup(true)

    const end = Date.now() + 1000
    ;(function frame() {
      confetti({
        particleCount: 6,
        spread: 80,
        startVelocity: 30,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#F472B6', '#EC4899', '#DB2777', '#BE185D'],
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    })()
  }

  return (
    <div className="flex flex-col items-center justify-center bg-linear-to-b from-pink-100 to-white min-h-screen p-4">
      <Card className="max-w-xl w-full p-6 bg-white bg-opacity-80 rounded-lg shadow-lg relative z-10 flex flex-col">
        {/* Heading */}
        <div className="border-b-2 border-pink-300 pb-4">
          <h1 className="text-3xl font-bold text-pink-600 text-center">Happy Birthday!</h1>
        </div>

        {/* Image with overlay */}
        <div className="relative rounded-lg shadow-md w-full overflow-hidden">
          <video src="./src/assets/bd.MP4" className="object-cover w-full h-70" loop autoPlay />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col p-4">
            <h2 className="text-white text-lg font-bold mb-2 text-shadow-lg">To My Dearest Love,</h2>
            <p className="text-white text-start text-sm md:w-sm lg:w-sm text-shadow-xl">
              Wishing you a day filled with love, joy, and all the things that make you smile. You deserve the best on
              your special day and always. Happy Birthday!
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="border-t-2 border-pink-300 pt-4 grid grid-cols-3 gap-6">
          <button
            className={`px-3 py-1 ${
              activeSection === 'profile' ? 'bg-pink-400' : 'bg-pink-300'
            } text-white rounded-lg shadow hover:bg-pink-400 transition flex items-center justify-center`}
            onClick={() => toggleSection('profile')}
          >
            <img src="./src/assets/user.png" alt="Profile" className="inline-block w-5 h-5 mr-2" />
            Profile
          </button>

          <button
            className={`px-3 py-1 ${
              activeSection === 'gallery' ? 'bg-pink-400' : 'bg-pink-300'
            } text-white rounded-lg shadow hover:bg-pink-400 transition flex items-center justify-center`}
            onClick={() => toggleSection('gallery')}
          >
            <img src="./src/assets/photo.png" alt="Gallery" className="inline-block w-5 h-5 mr-2" />
            Gallery
          </button>

          <button
            className={`px-3 py-1 ${
              activeSection === 'wishes' ? 'bg-pink-400' : 'bg-pink-300'
            } text-white rounded-lg shadow hover:bg-pink-400 transition flex items-center justify-center`}
            onClick={() => toggleSection('wishes')}
          >
            <img src="./src/assets/confetti.png" alt="Wishes" className="inline-block w-5 h-5 mr-2" />
            Wishes
          </button>
        </div>

        {/* Sections */}
        <div className="border-t-2 border-pink-300 pt-4">
          {activeSection === 'profile' && (
            <div className="items-start justify-between lg:flex lg:flex-row flex-col space-y-2">
              <img
                src="./src/assets/pf.JPG"
                alt="Profile"
                className="lg:w-54 lg:h-54 w-44 mx-auto lg:mr-4 rounded-lg object-cover border-2 border-pink-300"
              />
              <div className="mr-auto mx-auto">
                <h3 className="text-pink-500 font-bold text-xl mb-2 text-center">A little about you!</h3>
                <p className="text-pink-500 text-sm text-justify indent-8">
                  You are an amazing person with a heart of gold. Your kindness, compassion, and unwavering support make
                  you truly special. I am so grateful to have you in my life. Every moment spent with you is a treasure,
                  and your laughter brings joy to everyone around you. On this special day, I celebrate not just your
                  birth, but the incredible person you are and the positive impact you have on all of us.
                </p>
              </div>
            </div>
          )}

          {/* 📸 Photo Booth Section */}
          {activeSection === 'gallery' && (
            <div className="relative flex flex-col items-center overflow-hidden">
              <div className="flex flex-col gap-2 p-1 rounded-xl bg-white animate-slideDown w-32">
                {groupImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Collected ${index + 1}`}
                    className="w-full h-30 object-cover rounded-lg border-2 border-pink-300"
                  />
                ))}
              </div>

              {/* Button near images */}
              <button
                onClick={handleCollect}
                className="px-2 py-1 rounded-md bg-gray-200 text-pink-600 hover:bg-gray-300 -mt-50 z-10"
              >
                Collect
              </button>
            </div>
          )}

          {activeSection === 'wishes' && (
            <div className="p-2 lg:flex lg:flex-row flex-col space-y-2 items-center justify-between">
              <img
                src="./src/assets/pf3.png"
                alt="Birthday Cake"
                className="lg:w-64 lg:h-54 w-44 mx-auto object-cover rounded-lg border-2 border-pink-300 lg:mr-4"
              />
              <div className="mb-auto mx-auto">
                <h3 className="text-pink-500 font-bold text-xl mb-2 text-center">Happy BD to you!</h3>
                <p className="text-pink-500 text-sm text-justify indent-8">
                  On your special day, I wish you endless happiness, good health, and all the success in the world. May
                  your year ahead be filled with exciting adventures, cherished moments, and dreams come true. You deserve
                  all the love and joy that life has to offer. Happy Birthday!
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Floating popup */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 cursor-pointer"
          onClick={handleClose}
        >
          <div
            className="relative bg-white rounded-xl shadow-2xl p-2 animate-slideUpDown grid gap-2 grid-rows-3"
            onClick={(e) => e.stopPropagation()}
          >
            {groupImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Collected ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg border-2 border-pink-300"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
