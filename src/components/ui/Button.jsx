/**
 * Reusable Button Component
 *
 * Phase 5: Enhanced with full accessibility support
 * - 44px minimum touch targets for mobile
 * - Hover states for all variants
 * - Focus states with visible ring for keyboard navigation
 * - Disabled state with reduced opacity
 * - Smooth transitions
 */

function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
  ...props
}) {
  const baseStyles = "px-4 py-2 rounded-xl font-semibold transition-all min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"

  const variants = {
    primary: "text-white hover:shadow-lg",
    secondary: "bg-gray-100 hover:bg-gray-200 focus:ring-gray-400 shadow-sm",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-md",
  }

  // Custom gradient for primary variant - new blue to periwinkle
  const primaryStyle = variant === "primary" ? {
    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-periwinkle) 100%)',
    boxShadow: 'var(--shadow-md)'
  } : {}

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{
        fontFamily: 'var(--font-display)',
        ...primaryStyle
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
