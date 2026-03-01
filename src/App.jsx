import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl mx-auto p-8 space-y-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Gas Price Calculator
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Tailwind Test</h2>
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            count is {count}
          </button>
          <p className="mt-4 text-gray-600">
            ✅ If you can see styled buttons and colors, Tailwind is working!
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
