/**
 * Alert Component
 *
 * NOTE: This is a basic implementation for Phase 2.
 * Phase 4 will integrate with localStorage detection for showing warnings
 */

function Alert({ children, variant = "warning" }) {
  const variants = {
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    success: "bg-green-50 border-green-200 text-green-800",
  }

  const icons = {
    warning: "⚠️",
    error: "❌",
    info: "ℹ️",
    success: "✅",
  }

  return (
    <div
      className={`
        border rounded-lg p-4 flex items-start gap-3
        ${variants[variant]}
      `}
      role="alert"
    >
      <span className="text-lg">{icons[variant]}</span>
      <div className="flex-1 text-sm">{children}</div>
    </div>
  )
}

export default Alert
