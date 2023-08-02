require("dotenv").config()
const { findAllTimeslots } = require("./service")

exports.getAllTimeslots = async (req, res) => {
  try {
    
    const foundTimeslots = await findAllTimeslots ()

    if (!foundTimeslots) {
      return res.status(404).json("No User Found")
    }

    return res.json(foundTimeslots)
  } catch (error) {
    console.log(error)
    return res.status(500).json()
  }
}