/**
 * Reusable Input Component
 *
 * Phase 5: Fully accessible input with:
 * - Focus ring for keyboard navigation
 * - Error state handling with red border
 * - Mobile-optimized input modes (decimal keyboard)
 * - Range validation (min/max)
 * - Inline error messages
 */

function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  min,
  max,
  step,
  inputMode,
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          className="block text-sm font-semibold"
          style={{
            color: 'var(--color-text)',
            fontFamily: 'var(--font-body)'
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        inputMode={inputMode}
        className={`
          w-full px-4 py-3 border-2 rounded-xl
          transition-all
          placeholder:text-gray-400
          ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'}
        `}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px' // Prevents zoom on iOS
        }}
        {...props}
      />
      {error && (
        <p className="text-sm font-medium text-red-600 flex items-center gap-1">
          <span>⚠️</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

export default Input
