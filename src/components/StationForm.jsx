import Input from './ui/Input'

/**
 * StationForm Component
 *
 * Phase 3 implementation with:
 * - Controlled components using props from App.jsx
 * - Real-time state updates via onChange callback
 *
 * Phase 4 will add:
 * - Inline validation error messages
 * - Enhanced error handling
 *
 * @param {Object} props
 * @param {string} props.stationName - Fixed label (either "Costco" or "Local Station")
 * @param {Object} props.stationData - Current station data { price, distance, time }
 * @param {Function} props.onChange - Callback for field changes: (field, value) => void
 */
function StationForm({ stationName, stationData = { price: '', distance: '', time: '' }, onChange }) {

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
      />
    </div>
  )
}

export default StationForm
