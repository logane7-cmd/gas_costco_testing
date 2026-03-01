/**
 * Calculate total cost for filling up at a gas station
 * Includes cost of fuel AND gas used during round-trip to station
 *
 * Phase 4: Added defensive checks to prevent division by zero and invalid inputs
 *
 * @param {Object} params - Calculation parameters
 * @param {number} params.tankSize - Vehicle tank size in gallons
 * @param {number} params.mpg - Vehicle miles per gallon
 * @param {number} params.price - Price per gallon at this station
 * @param {number} params.distance - ONE-WAY distance to station in miles
 * @returns {Object} - { fuelCost, tripGasCost, totalCost }
 */
export function calculateStationCost({ tankSize, mpg, price, distance }) {
  // Defensive checks - prevent invalid operations (Phase 4)
  if (!tankSize || !mpg || !price || tankSize <= 0 || mpg <= 0 || price <= 0) {
    return { fuelCost: 0, tripGasCost: 0, totalCost: 0 }
  }

  // Allow distance to be 0 (on-site stations)
  if (distance < 0) {
    return { fuelCost: 0, tripGasCost: 0, totalCost: 0 }
  }

  // Cost to fill the tank
  const fuelCost = tankSize * price

  // ROUND-TRIP distance (user enters one-way, we double it)
  const tripDistance = distance * 2

  // Gas used during the trip to/from station
  // Division by mpg is safe because we checked mpg > 0 above
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
 * Phase 4: Added defensive checks for invalid inputs
 *
 * @param {Object} station1Result - Result from calculateStationCost for station 1
 * @param {Object} station2Result - Result from calculateStationCost for station 2
 * @param {number} time1 - Drive time to station 1 in minutes (round-trip)
 * @param {number} time2 - Drive time to station 2 in minutes (round-trip)
 * @returns {Object} - { savings, timeDiff, cheaperStation, isNearEqual }
 */
export function compareStations(station1Result, station2Result, time1, time2) {
  // Defensive checks - ensure we have valid results
  if (!station1Result || !station2Result || station1Result.totalCost == null || station2Result.totalCost == null) {
    return {
      savings: 0,
      timeDiff: 0,
      cheaperStation: 1,
      isNearEqual: true,
      station1TotalCost: 0,
      station2TotalCost: 0
    }
  }

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
 * Phase 4: Enhanced with range validation matching the standard ranges
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

  const tankSize = parseFloat(vehicleData.tankSize)
  const mpg = parseFloat(vehicleData.mpg)

  // Validate against standard ranges
  if (isNaN(tankSize) || tankSize < 1 || tankSize > 50) {
    return false
  }

  if (isNaN(mpg) || mpg < 1 || mpg > 150) {
    return false
  }

  // Check station 1
  if (!station1 || station1.price == null || station1.distance == null || station1.time == null) {
    return false
  }

  const price1 = parseFloat(station1.price)
  const distance1 = parseFloat(station1.distance)
  const time1 = parseFloat(station1.time)

  if (isNaN(price1) || price1 < 0.01 || price1 > 20) {
    return false
  }

  if (isNaN(distance1) || distance1 < 0 || distance1 > 100) {
    return false
  }

  if (isNaN(time1) || time1 < 0 || time1 > 300) {
    return false
  }

  // Check station 2
  if (!station2 || station2.price == null || station2.distance == null || station2.time == null) {
    return false
  }

  const price2 = parseFloat(station2.price)
  const distance2 = parseFloat(station2.distance)
  const time2 = parseFloat(station2.time)

  if (isNaN(price2) || price2 < 0.01 || price2 > 20) {
    return false
  }

  if (isNaN(distance2) || distance2 < 0 || distance2 > 100) {
    return false
  }

  if (isNaN(time2) || time2 < 0 || time2 > 300) {
    return false
  }

  return true
}
