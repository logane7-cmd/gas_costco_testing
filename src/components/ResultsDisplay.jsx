/**
 * ResultsDisplay Component
 *
 * NOTE: This is a placeholder implementation for Phase 2.
 * Phase 3 will add:
 * - Real-time calculation using calculator.js utility
 * - Trade-off question formatting (3 scenarios):
 *   1. Costco cheaper but farther: "Would you trade X minutes for $Y savings?"
 *   2. Local cheaper and closer: "Local is cheaper by $X and Y minutes closer"
 *   3. Equal cost (within $0.10): "Both cost ~$X, but [station] takes Y more minutes"
 * - Conditional display (hide if any field invalid or empty)
 * - Colored highlights (green for savings, blue for time)
 * - Large, prominent text (text-2xl or text-3xl)
 *
 * @param {object} comparison - Calculation results (will come from App.jsx in Phase 3)
 */

function ResultsDisplay({ comparison }) {
  // Phase 2: Show placeholder
  // Phase 3: Will receive real calculation data and format the trade-off question

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg shadow-lg">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Your Results
        </h2>
        <p className="text-lg text-gray-600">
          {comparison ? (
            // Phase 3: Format trade-off message based on comparison data
            <span className="text-2xl font-semibold">
              Trade-off question will appear here
            </span>
          ) : (
            <span className="text-gray-400">
              Fill in all fields to see your comparison
            </span>
          )}
        </p>
      </div>
    </div>
  )
}

export default ResultsDisplay
