import Button from './ui/Button'

/**
 * WelcomeScreen Component
 *
 * NOTE: This is a basic implementation for Phase 2.
 * Phase 3 will add:
 * - Conditional display based on localStorage flag (hasSeenTutorial)
 * - useLocalStorage hook to persist dismissal
 * - "Get Started" button sets localStorage flag
 * Phase 5 will add:
 * - "Help" icon in App header to re-show tutorial
 *
 * @param {function} onDismiss - Callback when user clicks "Get Started"
 */

function WelcomeScreen({ onDismiss }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to Gas Price Calculator!
          </h1>
          <p className="text-lg text-gray-600">
            Compare Costco vs your local gas station to see if
            the drive is worth the savings.
          </p>
        </div>

        <div className="space-y-3 text-gray-700">
          <h2 className="text-xl font-semibold">How it works:</h2>
          <ol className="list-decimal list-inside space-y-2 ml-2">
            <li>Enter your vehicle details (tank size, MPG)</li>
            <li>Enter prices and locations for both stations</li>
            <li>See if the savings justify the extra drive time</li>
          </ol>
        </div>

        <Button
          onClick={onDismiss}
          variant="primary"
          className="w-full text-lg py-3"
        >
          Get Started
        </Button>
      </div>
    </div>
  )
}

export default WelcomeScreen
