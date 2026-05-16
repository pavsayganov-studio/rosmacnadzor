import * as React from 'react'
import { cn } from '@renderer/lib/utils'

interface CharacterMorphProps {
  texts: string[]
  reserveTexts?: string[]
  className?: string
  interval?: number
}

// motion/react removed: animation library not needed for performance build
const CharacterMorph = React.forwardRef<HTMLDivElement, CharacterMorphProps>(
  ({ texts, reserveTexts = [], className, interval = 3000 }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)

    React.useEffect(() => {
      if (texts.length <= 1) return
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length)
      }, interval)
      return () => clearInterval(timer)
    }, [interval, texts.length])

    const widthSource = [...texts, ...reserveTexts]

    return (
      <div ref={ref} className={cn('relative inline-grid whitespace-nowrap', className)}>
        <span aria-hidden="true" className="pointer-events-none invisible col-start-1 row-start-1 grid">
          {widthSource.map((text, index) => (
            <span key={`${index}-${text}`} className="col-start-1 row-start-1">
              {text.split(' ').join('\u00A0')}
            </span>
          ))}
        </span>
        <span className="col-start-1 row-start-1 justify-self-center">
          {texts[currentIndex] || ''}
        </span>
      </div>
    )
  }
)

CharacterMorph.displayName = 'CharacterMorph'
export { CharacterMorph }
