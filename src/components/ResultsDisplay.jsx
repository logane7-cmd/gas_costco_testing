/**
 * ResultsDisplay Component
 *
 * Phase 3 implementation with:
 * - Real-time calculation display
 * - Trade-off question formatting with colored highlights
 * - Conditional rendering based on calculation availability
 *
 * Displays 3 types of messages:
 * 1. Cheaper but farther: "Would you trade X minutes for $Y savings?"
 * 2. Cheaper and closer: "Station is cheaper by $X and Y minutes closer"
 * 3. Equal cost: "Both cost ~$X, but [station] takes Y more minutes"
 *
 * @param {Object} props
 * @param {Object} props.calculation - Calculation results from App.jsx
 * @param {string} props.calculation.message - Formatted trade-off message
 * @param {Object} props.calculation.comparison - Comparison data with savings and timeDiff
 */
function ResultsDisplay({ calculation }) {
  // Helper function to highlight dollar amounts in green
  const highlightDollars = (text) => {
    return text.split(/(\$[\d.]+)/).map((part, index) => {
      if (part.match(/\$[\d.]+/)) {
        return <span key={index} className="text-green-600 font-bold">{part}</span>
      }
      return part
    })
  }

  // Helper function to highlight time amounts in blue
  const highlightTime = (text) => {
    return text.split(/(\d+\s*(?:minute|minutes|min))/).map((part, index) => {
      if (part.match(/\d+\s*(?:minute|minutes|min)/)) {
        return <span key={index} className="text-blue-600 font-bold">{part}</span>
      }
      return part
    })
  }

  // Combined highlighting function
  const formatMessage = (message) => {
    // First split by dollar amounts
    const parts = message.split(/(\$[\d.]+|\d+\s*(?:minute|minutes|min))/)

    return parts.map((part, index) => {
      if (part.match(/\$[\d.]+/)) {
        return <span key={index} className="text-green-600 font-bold">{part}</span>
      } else if (part.match(/\d+\s*(?:minute|minutes|min)/)) {
        return <span key={index} className="text-blue-600 font-bold">{part}</span>
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg shadow-lg">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Your Results
        </h2>
        <div className="text-lg text-gray-600">
          {calculation ? (
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed">
              {formatMessage(calculation.message)}
            </p>
          ) : (
            <span className="text-gray-400">
              Fill in all fields to see your comparison
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResultsDisplay
