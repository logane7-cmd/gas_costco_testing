import { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'

/**
 * VehicleForm Component
 *
 * NOTE: This is a basic implementation for Phase 2.
 * Phase 3 will add:
 * - State management via useLocalStorage hook
 * - Real-time validation (tank: 1-50 gal, MPG: 1-150)
 * - localStorage auto-save with debouncing
 * - Google search button functionality (opens new tab with tank size query)
 */

function VehicleForm() {
  // Temporary local state - will be replaced with useLocalStorage in Phase 3
  const [vehicleName, setVehicleName] = useState('')
  const [tankSize, setTankSize] = useState('')
  const [mpg, setMpg] = useState('')

  const handleGoogleSearch = () => {
    // Phase 3: Implement Google search for tank size
    // URL format: https://google.com/search?q=${encodeURIComponent(vehicleName)}+gas+tank+size
    console.log('Google search will be implemented in Phase 3')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Your Vehicle</h2>

      <Input
        label="Vehicle Name"
        type="text"
        value={vehicleName}
        onChange={(e) => setVehicleName(e.target.value)}
        placeholder="e.g., Honda Civic"
        maxLength={50}
      />

      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Input
            label="Tank Size (gallons)"
            type="number"
            value={tankSize}
            onChange={(e) => setTankSize(e.target.value)}
            placeholder="12.5"
            min={1}
            max={50}
            step={0.1}
            inputMode="decimal"
          />
        </div>
        <Button
          onClick={handleGoogleSearch}
          variant="secondary"
          disabled={!vehicleName}
          className="mb-1"
          title="Search for tank size"
        >
          🔍
        </Button>
      </div>

      <Input
        label="MPG (Miles Per Gallon)"
        type="number"
        value={mpg}
        onChange={(e) => setMpg(e.target.value)}
        placeholder="30"
        min={1}
        max={150}
        step={0.1}
        inputMode="decimal"
      />
    </div>
  )
}

export default VehicleForm
