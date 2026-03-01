import { useState } from 'react'
import Input from './ui/Input'

/**
 * StationForm Component
 *
 * NOTE: This is a basic implementation for Phase 2.
 * Phase 3 will add:
 * - State management via useLocalStorage hook
 * - Real-time validation (price: $0.01-$20, distance: 0-100 mi, time: 0-300 min)
 * - Inline error messages for out-of-range inputs
 * - localStorage auto-save with debouncing
 *
 * @param {string} stationName - Fixed label (either "Costco" or "Local Station")
 */

function StationForm({ stationName }) {
  // Temporary local state - will be replaced with useLocalStorage in Phase 3
  const [price, setPrice] = useState('')
  const [distance, setDistance] = useState('')
  const [time, setTime] = useState('')

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{stationName}</h2>

      <Input
        label="Price per Gallon"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="$4.29"
        min={0.01}
        max={20}
        step={0.01}
        inputMode="decimal"
      />

      <Input
        label="Distance (miles, one-way)"
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        placeholder="8.5"
        min={0}
        max={100}
        step={0.1}
        inputMode="decimal"
      />

      <Input
        label="Drive Time (minutes, one-way)"
        type="number"
        value={time}
        onChange={(e) => setTime(e.target.value)}
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
