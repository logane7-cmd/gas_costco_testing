import { useState, useEffect } from 'react'
import { Fuel, Calculator, Clock, Save, Sparkles } from 'lucide-react'

/**
 * WelcomeScreen Component - Blue Coral Periwinkle Design
 *
 * Full-screen onboarding with:
 * - Clean Lucide icons instead of emojis
 * - New gradient: blue → coral → periwinkle
 * - Professional yet engaging aesthetic
 * - Staggered animations
 *
 * @param {function} onDismiss - Callback when user clicks "Get Started"
 */

function WelcomeScreen({ onDismiss }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: 'linear-gradient(135deg, #3B82F6 0%, #F87171 50%, #A78BFA 100%)',
      }}
    >
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, white 40px, white 42px)',
          }}
        />
      </div>

      {/* Content card */}
      <div
        className={`relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 md:p-12 space-y-8 transform transition-all duration-700 delay-100 ${
          isVisible ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'
        }`}
      >
        {/* Icon Hero */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Main fuel icon with gradient background */}
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-periwinkle) 100%)',
              }}
            >
              <Fuel size={48} className="text-white" strokeWidth={2} />
            </div>

            {/* Floating sparkle accent */}
            <div className="absolute -top-2 -right-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center animate-pulse-custom"
                style={{ background: 'var(--color-coral)' }}
              >
                <Sparkles size={16} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className={`text-center space-y-3 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-periwinkle) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Is Costco Gas Worth the Drive?
          </h1>
          <p
            className="text-lg md:text-xl"
            style={{
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-body)'
            }}
          >
            Calculate the real cost of cheaper gas
          </p>
        </div>

        {/* Feature cards with icons */}
        <div className={`space-y-3 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--color-primary)' }}
            >
              <Calculator size={20} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                Smart Calculation
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                We factor in distance, fuel cost, and your time
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--color-periwinkle)' }}
            >
              <Clock size={20} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                Clear Trade-offs
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                See exactly what you're trading: time vs. money
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--color-coral)' }}
            >
              <Save size={20} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                Auto-Save
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Your settings save automatically in your browser
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onDismiss}
          className={`w-full py-4 px-6 text-lg font-bold text-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{
            fontFamily: 'var(--font-display)',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-periwinkle) 100%)',
            transitionDelay: '700ms',
          }}
        >
          Get Started
        </button>

        {/* Footer note */}
        <p className={`text-center text-sm transition-all duration-700 delay-900 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`} style={{ color: 'var(--color-text-muted)' }}>
          Takes less than 30 seconds
        </p>
      </div>
    </div>
  )
}

export default WelcomeScreen
