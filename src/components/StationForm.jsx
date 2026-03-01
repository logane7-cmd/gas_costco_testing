import Input from './ui/Input'

/**
 * StationForm Component
 *
 * Phase 4 implementation with:
 * - Controlled components using props from App.jsx
 * - Real-time state updates via onChange callback
 * - Inline validation error messages for out-of-range inputs
 *
 * @param {Object} props
 * @param {string} props.stationName - Fixed label (either "Costco" or "Local Station")
 * @param {Object} props.stationData - Current station data { price, distance, time }
 * @param {Function} props.onChange - Callback for field changes: (field, value) => void
 */
function StationForm({ stationName, stationData = { price: '', distance: '', time: '' }, onChange }) {

  // Validation logic - only show errors if field has a value
  const getPriceError = () => {
    if (!stationData.price) return null
    const value = parseFloat(stationData.price)
    if (isNaN(value)) return "Price must be a number"
    if (value < 0.01) return "Price must be at least $0.01"
    if (value > 20) return "Price must be $20.00 or less"
    return null
  }

  const getDistanceError = () => {
    if (!stationData.distance && stationData.distance !== 0) return null
    const value = parseFloat(stationData.distance)
    if (isNaN(value)) return "Distance must be a number"
    if (value < 0) return "Distance cannot be negative"
    if (value > 100) return "Distance must be 100 miles or less"
    return null
  }

  const getTimeError = () => {
    if (!stationData.time && stationData.time !== 0) return null
    const value = parseFloat(stationData.time)
    if (isNaN(value)) return "Time must be a number"
    if (value < 0) return "Time cannot be negative"
    if (value > 300) return "Time must be 300 minutes or less"
    return null
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{stationName}</h2>

      <Input
        label="Price per Gallon"
        type="number"
        value={stationData.price}
        onChange={(e) => onChange('price', e.target.value)}
        placeholder="$4.29"
        min={0.01}
        max={20}
        step={0.01}
        inputMode="decimal"
        error={getPriceError()}
      />

      <Input
        label="Distance (miles, one-way)"
        type="number"
        value={stationData.distance}
        onChange={(e) => onChange('distance', e.target.value)}
        placeholder="8.5"
        min={0}
        max={100}
        step={0.1}
        inputMode="decimal"
        error={getDistanceError()}
      />

      <Input
        label="Drive Time (minutes, one-way)"
        type="number"
        value={stationData.time}
        onChange={(e) => onChange('time', e.target.value)}
        placeholder="15"
        min={0}
        max={300}
        step={1}
        inputMode="decimal"
        error={getTimeError()}
      />
    </div>
  )
}

export default StationForm
