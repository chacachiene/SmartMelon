import sensorAPI from "./sensorAPI"

export const getAll = async (feed) => {
  try {
    const response = await sensorAPI.getAll(feed)
    return response
  } catch (error) {
    console.error(error)
  }
}
export const getLastValue = async (feed) => {
  try {
    const response = await sensorAPI.getLastValue(feed)
    console.log("get last value", response.value)
    return response.value
  } catch (error) {
    console.error(error)
  }
}
