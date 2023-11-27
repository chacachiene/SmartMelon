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
    return response.value
  } catch (error) {
    console.error(error)
  }
}
