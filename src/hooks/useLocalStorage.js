import { useState, useEffect } from 'react'

/**
 * Custom hook for persisting state to localStorage with error handling
 * @param {string} key - localStorage key (should be namespaced, e.g., 'gasPriceCalc_vehicle')
 * @param {any} initialValue - Default value if no stored value exists
 * @returns {[any, function]} - [storedValue, setValue] tuple like useState
 */
export function useLocalStorage(key, initialValue) {
  // Initialize state with value from localStorage or initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
      return initialValue
    }
  })

  // Update localStorage whenever storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
      // Could dispatch custom event here to show warning banner
      // window.dispatchEvent(new CustomEvent('localStorage-error', { detail: error }))
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

/**
 * Utility function to check if localStorage is available
 * @returns {boolean} - true if localStorage is accessible
 */
export function checkLocalStorageAvailable() {
  try {
    const test = '__storage_test__'
    window.localStorage.setItem(test, test)
    window.localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}
