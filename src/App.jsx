import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import VehicleForm from './components/VehicleForm'
import StationForm from './components/StationForm'
import ResultsDisplay from './components/ResultsDisplay'
import Alert from './components/ui/Alert'

/**
 * Main App Component
 *
 * NOTE: This is a basic implementation for Phase 2 (static components).
 * Phase 3 will add:
 * - useLocalStorage hook for state management
 * - localStorage availability detection
 * - Real-time calculation logic
 * - Passing calculation results to ResultsDisplay
 * Phase 4 will add:
 * - Validation and error handling
 * - localStorage warning banner
 */

function App() {
  // Temporary state for Phase 2 - will use useLocalStorage in Phase 3
  const [showWelcome, setShowWelcome] = useState(true)
  const [showStorageWarning] = useState(false) // Phase 4: Detect localStorage availability

  const handleDismissWelcome = () => {
    setShowWelcome(false)
    // Phase 3: Will also set localStorage flag here
  }

  return (
    <>
      {showWelcome && <WelcomeScreen onDismiss={handleDismissWelcome} />}

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto p-4 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Gas Price Calculator
            </h1>
            <p className="text-gray-600 mt-2">
              Costco vs Local Station
            </p>
          </div>

          {/* localStorage Warning - Phase 4 */}
          {showStorageWarning && (
            <div className="mb-6">
              <Alert variant="warning">
                Data will not be saved. Your browser's private mode or settings
                prevent data storage. Calculator will still work, but your information
                won't persist after closing this page.
              </Alert>
            </div>
          )}

          {/* Main Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Vehicle Form */}
            <VehicleForm />

            {/* Gas Stations - Stack on mobile, side-by-side on tablet+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <StationForm stationName="Costco" />
              <StationForm stationName="Local Station" />
            </div>

            {/* Results Display */}
            <ResultsDisplay comparison={null} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
