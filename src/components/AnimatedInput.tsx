'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface AnimatedInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({ 
  value, 
  onChange, 
  className = '' 
}) => {
  const placeholders = [
    "Enter title",
    "What's on your mind", 
    "Add a creative title", 
    "Describe your content"
  ]

  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0)

  useEffect(() => {
    const placeholderTimer = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => 
        (prev + 1) % placeholders.length
      )
    }, 3000)

    return () => clearInterval(placeholderTimer)
  }, [])

  return (
    <div className="relative w-full">
      <input 
        type="text" 
        value={value}
        onChange={onChange}
        className={`
          w-full 
          px-3 
          py-2 
          dark:bg-neutral-800 
          text-white 
          border 
          dark:border-neutral-700 
          rounded-md 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-600 
          ${className}
        `}
        placeholder=""
      />
      {value === '' && (
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPlaceholderIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-neutral-500"
            >
              {placeholders[currentPlaceholderIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default AnimatedInput

