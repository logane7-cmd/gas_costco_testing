/**
 * Reusable Input Component
 *
 * NOTE: This is a basic implementation for Phase 2.
 * Phase 3 will add: real-time validation, error state handling, localStorage integration
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
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
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
          w-full px-3 py-2 border rounded-lg
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default Input
