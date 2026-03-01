import { useState, useMemo } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import VehicleForm from './components/VehicleForm'
import StationForm from './components/StationForm'
import ResultsDisplay from './components/ResultsDisplay'
import Alert from './components/ui/Alert'
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
          </div>
        </div>
      </div>
    </>
  )
}

export default App
