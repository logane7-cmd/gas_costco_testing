import { useState, useMemo } from 'react'
import { Fuel, HelpCircle, Trash2 } from 'lucide-react'
import WelcomeScreen from './components/WelcomeScreen'
import VehicleForm from './components/VehicleForm'
import StationForm from './components/StationForm'
import ResultsDisplay from './components/ResultsDisplay'
import Alert from './components/ui/Alert'
import Button from './components/ui/Button'
import { useLocalStorage, checkLocalStorageAvailable } from './hooks/useLocalStorage'
import {
  calculateStationCost,
  compareStations,
  formatTradeoffMessage,
  areInputsValid
} from './utils/calculator'

/**
 * Main App Component
 *
 * Phase 3 implementation with:
 * - useLocalStorage hook for state persistence
 * - localStorage availability detection
 * - Real-time calculation logic
 * - Calculation results passed to ResultsDisplay
 *
 * Phase 4 will add:
 * - Input validation and error handling
 * - Enhanced error messages
 */

function App() {
  // Check localStorage availability on mount
  const [storageAvailable] = useState(() => checkLocalStorageAvailable())

  // State with localStorage persistence
  const [hasSeenTutorial, setHasSeenTutorial] = useLocalStorage('gasPriceCalc_tutorial', false)
  const [vehicleData, setVehicleData] = useLocalStorage('gasPriceCalc_vehicle', {
    name: '',
    tankSize: '',
    mpg: ''
  })
  const [stations, setStations] = useLocalStorage('gasPriceCalc_stations', [
    { name: 'Costco', price: '', distance: '', time: '' },
    { name: 'Local Station', price: '', distance: '', time: '' }
  ])

  const handleDismissWelcome = () => {
    setHasSeenTutorial(true)
  }

  const handleShowHelp = () => {
    setHasSeenTutorial(false)
  }

  const handleClearAll = () => {
    // Reset all form data
    setVehicleData({
      name: '',
      tankSize: '',
      mpg: ''
    })
    setStations([
      { name: 'Costco', price: '', distance: '', time: '' },
      { name: 'Local Station', price: '', distance: '', time: '' }
    ])
    // Note: localStorage is cleared automatically by useLocalStorage hook
  }

  // Update vehicle data
  const handleVehicleChange = (field, value) => {
    setVehicleData(prev => ({ ...prev, [field]: value }))
  }

  // Update station data
  const handleStationChange = (stationIndex, field, value) => {
    setStations(prev => {
      const updated = [...prev]
      updated[stationIndex] = { ...updated[stationIndex], [field]: value }
      return updated
    })
  }

  // Real-time calculation - runs whenever state changes
  const calculation = useMemo(() => {
    // Check if all inputs are valid
    if (!areInputsValid(vehicleData, stations[0], stations[1])) {
      return null
    }

    // Calculate cost for each station
    const station1Result = calculateStationCost({
      tankSize: parseFloat(vehicleData.tankSize),
      mpg: parseFloat(vehicleData.mpg),
      price: parseFloat(stations[0].price),
      distance: parseFloat(stations[0].distance)
    })

    const station2Result = calculateStationCost({
      tankSize: parseFloat(vehicleData.tankSize),
      mpg: parseFloat(vehicleData.mpg),
      price: parseFloat(stations[1].price),
      distance: parseFloat(stations[1].distance)
    })

    // Compare stations (note: times are already round-trip as entered by user)
    const comparison = compareStations(
      station1Result,
      station2Result,
      parseFloat(stations[0].time),
      parseFloat(stations[1].time)
    )

    // Format the trade-off message
    const message = formatTradeoffMessage(
      comparison,
      stations[0].name,
      stations[1].name,
      parseFloat(stations[0].time),
      parseFloat(stations[1].time)
    )

    return {
      station1Result,
      station2Result,
      comparison,
      message
    }
  }, [vehicleData, stations])

  return (
    <>
      {!hasSeenTutorial && <WelcomeScreen onDismiss={handleDismissWelcome} />}

      <div className="min-h-screen py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          {/* Header with clean icon design */}
          <div className="text-center mb-10 md:mb-14 relative animate-fadeIn">
            {/* Fuel icon logo */}
            <div className="flex justify-center mb-5">
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-periwinkle) 100%)',
                }}
              >
                <Fuel size={48} className="text-white" strokeWidth={2} />
              </div>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3"
              style={{
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-periwinkle) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Gas Price Calculator
            </h1>

            <p className="text-lg md:text-xl font-medium" style={{ color: 'var(--color-text-muted)' }}>
              Costco vs Local Station • Make smarter decisions
            </p>

            {/* Help button with icon */}
            <button
              onClick={handleShowHelp}
              className="absolute top-0 right-0 p-3 rounded-xl hover:bg-white shadow-md transition-all hover:shadow-lg hover:scale-110 bg-white/80 backdrop-blur-sm"
              aria-label="Show help tutorial"
              title="Need help?"
              style={{ color: 'var(--color-periwinkle)' }}
            >
              <HelpCircle size={24} strokeWidth={2} />
            </button>
          </div>

          {/* localStorage Warning */}
          {!storageAvailable && (
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
            <VehicleForm
              vehicleData={vehicleData}
              onChange={handleVehicleChange}
            />

            {/* Gas Stations - Stack on mobile, side-by-side on tablet+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <StationForm
                stationName="Costco"
                stationData={stations[0]}
                onChange={(field, value) => handleStationChange(0, field, value)}
              />
              <StationForm
                stationName="Local Station"
                stationData={stations[1]}
                onChange={(field, value) => handleStationChange(1, field, value)}
              />
            </div>

            {/* Results Display */}
            <ResultsDisplay calculation={calculation} />

            {/* Clear All Button */}
            <div className="text-center pt-6 animate-fadeIn" style={{ animationDelay: '400ms' }}>
              <Button
                onClick={handleClearAll}
                variant="secondary"
                className="px-8 py-3 text-base inline-flex items-center gap-2"
              >
                <Trash2 size={18} />
                Clear All Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
