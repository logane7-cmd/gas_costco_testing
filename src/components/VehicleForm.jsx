import Input from './ui/Input'
import Button from './ui/Button'

/**
 * VehicleForm Component
 *
 * Phase 4 implementation with:
 * - Controlled components using props from App.jsx
 * - Google search button for tank size lookup
 * - Real-time state updates via onChange callback
 * - Inline validation error messages for out-of-range inputs
 *
 * @param {Object} props
 * @param {Object} props.vehicleData - Current vehicle data { name, tankSize, mpg }
 * @param {Function} props.onChange - Callback for field changes: (field, value) => void
 */
function VehicleForm({ vehicleData = { name: '', tankSize: '', mpg: '' }, onChange }) {
  const handleGoogleSearch = () => {
    if (vehicleData.name) {
      const query = encodeURIComponent(`${vehicleData.name} gas tank size`)
      window.open(`https://google.com/search?q=${query}`, '_blank', 'noopener,noreferrer')
    }
  }

  // Validation logic - only show errors if field has a value
  const getTankSizeError = () => {
    if (!vehicleData.tankSize) return null
    const value = parseFloat(vehicleData.tankSize)
    if (isNaN(value)) return "Tank size must be a number"
    if (value < 1) return "Tank size must be at least 1 gallon"
    if (value > 50) return "Tank size must be 50 gallons or less"
    return null
  }

  const getMpgError = () => {
    if (!vehicleData.mpg) return null
    const value = parseFloat(vehicleData.mpg)
    if (isNaN(value)) return "MPG must be a number"
    if (value < 1) return "MPG must be at least 1"
    if (value > 150) return "MPG must be 150 or less"
    return null
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Your Vehicle</h2>

      <Input
        label="Vehicle Name"
        type="text"
        value={vehicleData.name}
        onChange={(e) => onChange('name', e.target.value)}
        placeholder="e.g., Honda Civic"
        maxLength={50}
      />

      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Input
            label="Tank Size (gallons)"
            type="number"
            value={vehicleData.tankSize}
            onChange={(e) => onChange('tankSize', e.target.value)}
            placeholder="12.5"
            min={1}
            max={50}
            step={0.1}
            inputMode="decimal"
            error={getTankSizeError()}
          />
        </div>
        <Button
          onClick={handleGoogleSearch}
          variant="secondary"
          disabled={!vehicleData.name}
          className="mb-1"
          title="Search for tank size"
        >
          🔍
        </Button>
      </div>

      <Input
        label="MPG (Miles Per Gallon)"
        type="number"
        value={vehicleData.mpg}
        onChange={(e) => onChange('mpg', e.target.value)}
        placeholder="30"
        min={1}
        max={150}
        step={0.1}
        inputMode="decimal"
        error={getMpgError()}
      />
    </div>
  )
}

export default VehicleForm
