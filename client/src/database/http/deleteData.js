import sensorAPI from "./sensorAPI"

export const deleteValue = async (feed,id) => {
  try {
    const response = await sensorAPI.deleteValue(feed,id)
    console.log("response",response)
    return response.value
  } catch (error) {
    console.error(error)
  }
}
