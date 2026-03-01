/**
 * Reusable Button Component
 *
 * NOTE: This is a basic implementation for Phase 2.
 * Phase 3 will add: loading states, disabled states, additional variants
 */

function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition min-h-[44px] min-w-[44px]"

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
