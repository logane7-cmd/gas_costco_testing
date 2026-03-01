/**
 * Calculate total cost for filling up at a gas station
 * Includes cost of fuel AND gas used during round-trip to station
 *
 * @param {Object} params - Calculation parameters
 * @param {number} params.tankSize - Vehicle tank size in gallons
 * @param {number} params.mpg - Vehicle miles per gallon
 * @param {number} params.price - Price per gallon at this station
 * @param {number} params.distance - ONE-WAY distance to station in miles
 * @returns {Object} - { fuelCost, tripGasCost, totalCost }
 */
export function calculateStationCost({ tankSize, mpg, price, distance }) {
  // Cost to fill the tank
  const fuelCost = tankSize * price

  // ROUND-TRIP distance (user enters one-way, we double it)
  const tripDistance = distance * 2

  // Gas used during the trip to/from station
  const tripGasCost = (tripDistance / mpg) * price

  // Total cost = fillup + trip gas
  const totalCost = fuelCost + tripGasCost

  return {
    fuelCost: parseFloat(fuelCost.toFixed(2)),
    tripGasCost: parseFloat(tripGasCost.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2))
  }
}

/**
 * Compare two gas stations and return savings/time tradeoff
 *
 * @param {Object} station1Result - Result from calculateStationCost for station 1
 * @param {Object} station2Result - Result from calculateStationCost for station 2
 * @param {number} time1 - Drive time to station 1 in minutes (round-trip)
 * @param {number} time2 - Drive time to station 2 in minutes (round-trip)
 * @returns {Object} - { savings, timeDiff, cheaperStation, isNearEqual }
 */
export function compareStations(station1Result, station2Result, time1, time2) {
  const savings = Math.abs(station1Result.totalCost - station2Result.totalCost)
  const timeDiff = Math.abs(time1 - time2)

  // Determine which station is cheaper (1 or 2)
  const cheaperStation = station1Result.totalCost < station2Result.totalCost ? 1 : 2

  // If costs are within $0.10, consider them "about the same"
  const isNearEqual = savings < 0.10

  return {
    savings: parseFloat(savings.toFixed(2)),
    timeDiff,
    cheaperStation,
    isNearEqual,
    station1TotalCost: station1Result.totalCost,
    station2TotalCost: station2Result.totalCost
  }
}

/**
 * Format the trade-off message based on comparison results
 * Handles 3 scenarios: cheaper but farther, cheaper and closer, or equal pricing
 *
 * @param {Object} comparison - Result from compareStations
 * @param {string} station1Name - Name of station 1 (e.g., "Costco")
 * @param {string} station2Name - Name of station 2 (e.g., "Local Station")
 * @param {number} time1 - Drive time to station 1 (round-trip)
 * @param {number} time2 - Drive time to station 2 (round-trip)
 * @returns {string} - Formatted trade-off message
 */
export function formatTradeoffMessage(comparison, station1Name, station2Name, time1, time2) {
  const { savings, timeDiff, cheaperStation, isNearEqual, station1TotalCost, station2TotalCost } = comparison

  // Scenario 1: Costs are basically equal (within $0.10)
  if (isNearEqual) {
    const avgCost = ((station1TotalCost + station2TotalCost) / 2).toFixed(2)

    if (timeDiff === 0) {
      return `Both stations cost about the same (~$${avgCost}) and take the same time to reach`
    }

    const fartherStation = time1 > time2 ? station1Name : station2Name
    return `Both stations cost about the same (~$${avgCost}), but ${fartherStation} takes ${timeDiff} more minutes`
  }

  // Determine cheaper and more expensive stations
  const cheaperName = cheaperStation === 1 ? station1Name : station2Name
  const expensiveName = cheaperStation === 1 ? station2Name : station1Name
  const cheaperTime = cheaperStation === 1 ? time1 : time2
  const expensiveTime = cheaperStation === 1 ? time2 : time1

  // Scenario 2: Cheaper station takes longer (the key trade-off question)
  if (cheaperTime > expensiveTime) {
    return `Would you trade ${timeDiff} minutes of your time for $${savings} in savings?`
  }

  // Scenario 3: Cheaper station is also closer or same time (obvious choice)
  if (cheaperTime < expensiveTime) {
    return `${cheaperName} is cheaper by $${savings} and ${timeDiff} minutes closer`
  }

  // Same time, one cheaper
  return `${cheaperName} is cheaper by $${savings} and takes the same time to reach`
}

/**
 * Check if all required fields are filled and valid
 *
 * @param {Object} vehicleData - { name, tankSize, mpg }
 * @param {Object} station1 - { price, distance, time }
 * @param {Object} station2 - { price, distance, time }
 * @returns {boolean} - true if all fields are valid
 */
export function areInputsValid(vehicleData, station1, station2) {
  // Check vehicle data
  if (!vehicleData || !vehicleData.name || !vehicleData.tankSize || !vehicleData.mpg) {
    return false
  }

  if (vehicleData.tankSize <= 0 || vehicleData.mpg <= 0) {
    return false
  }

  // Check station 1
  if (!station1 || station1.price == null || station1.distance == null || station1.time == null) {
    return false
  }

  if (station1.price <= 0 || station1.distance < 0 || station1.time < 0) {
    return false
  }

  // Check station 2
  if (!station2 || station2.price == null || station2.distance == null || station2.time == null) {
    return false
  }

  if (station2.price <= 0 || station2.distance < 0 || station2.time < 0) {
    return false
  }

  return true
}
