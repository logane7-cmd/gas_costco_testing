import { Store, Fuel } from 'lucide-react'
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
  // Theme colors based on station - new blue/coral palette
  const isCostco = stationName === 'Costco'
  const theme = isCostco ? {
    icon: Store,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    hoverBorderColor: 'hover:border-red-300',
    accentColor: 'var(--color-coral)'
  } : {
    icon: Fuel,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    hoverBorderColor: 'hover:border-blue-300',
    accentColor: 'var(--color-primary)'
  }

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
    <div
      className={`bg-white p-6 md:p-8 rounded-2xl space-y-5 border-2 ${theme.borderColor} ${theme.hoverBorderColor} transition-all animate-slideInUp`}
      style={{
        boxShadow: 'var(--shadow-lg)',
        animationDelay: '150ms'
      }}
    >
      {/* Station header with icon and colored accent */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: theme.accentColor }}
        >
          <theme.icon size={22} className="text-white" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h2
            className="text-xl md:text-2xl font-bold"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text)'
            }}
          >
            {stationName}
          </h2>
          <div
            className="h-1 w-16 rounded-full mt-1"
            style={{ backgroundColor: theme.accentColor }}
          />
        </div>
      </div>

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
