import { TrendingDown, Clock, BarChart3 } from 'lucide-react'

/**
 * ResultsDisplay Component - Blue Coral Periwinkle Design
 *
 * Displays calculation results with:
 * - New gradient (blue → coral → periwinkle)
 * - Clean Lucide icons
 * - Large, readable typography
 * - Highlighted savings (green) and time (orange)
 *
 * @param {Object} props
 * @param {Object} props.calculation - Calculation results from App.jsx
 */
function ResultsDisplay({ calculation }) {
  // Combined highlighting function with new color scheme
  const formatMessage = (message) => {
    const parts = message.split(/(\$[\d.]+|\d+\s*(?:minute|minutes|min))/)

    return parts.map((part, index) => {
      if (part.match(/\$[\d.]+/)) {
        return (
          <span
            key={index}
            className="font-extrabold px-2 py-1 rounded-lg inline-block mx-1"
            style={{
              color: 'var(--color-success)',
              background: 'rgba(16, 185, 129, 0.1)'
            }}
          >
            {part}
          </span>
        )
      } else if (part.match(/\d+\s*(?:minute|minutes|min)/)) {
        return (
          <span
            key={index}
            className="font-extrabold px-2 py-1 rounded-lg inline-block mx-1"
            style={{
              color: 'var(--color-warning)',
              background: 'rgba(245, 158, 11, 0.1)'
            }}
          >
            {part}
          </span>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  if (!calculation) {
    return (
      <div
        className="p-8 md:p-12 rounded-2xl border-2 border-dashed transition-all animate-slideInUp"
        style={{
          borderColor: 'var(--color-border)',
          animationDelay: '300ms'
        }}
      >
        <div className="text-center space-y-4">
          <div
            className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center opacity-20"
            style={{ background: 'var(--color-periwinkle)' }}
          >
            <BarChart3 size={32} className="text-white" strokeWidth={2} />
          </div>
          <p className="text-lg" style={{ color: 'var(--color-text-muted)' }}>
            Fill in all fields above to see your comparison
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative overflow-hidden p-8 md:p-12 rounded-3xl space-y-6 animate-slideInUp"
      style={{
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-coral) 50%, var(--color-periwinkle) 100%)',
        boxShadow: 'var(--shadow-xl)',
        animationDelay: '300ms'
      }}
    >
      {/* Decorative geometric shapes */}
      <div className="absolute top-6 right-6 opacity-10">
        <div className="w-20 h-20 rounded-xl rotate-12" style={{ background: 'white' }} />
      </div>
      <div className="absolute bottom-6 left-6 opacity-10">
        <div className="w-16 h-16 rounded-full" style={{ background: 'white' }} />
      </div>

      <div className="relative text-center space-y-5">
        {/* Title with icon */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <BarChart3 size={24} className="text-white" strokeWidth={2.5} />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Your Result
          </h2>
        </div>

        {/* Main result message */}
        <div
          className="bg-white rounded-2xl p-6 md:p-8"
          style={{ boxShadow: 'var(--shadow-lg)' }}
        >
          <p
            className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text)'
            }}
          >
            {formatMessage(calculation.message)}
          </p>
        </div>

        {/* Visual indicators with icons */}
        <div className="flex justify-center gap-4 md:gap-8 text-white/90 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <TrendingDown size={18} strokeWidth={2} />
            <span className="font-medium">Savings in green</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} strokeWidth={2} />
            <span className="font-medium">Time in orange</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsDisplay
