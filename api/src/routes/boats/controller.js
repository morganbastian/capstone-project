require("dotenv").config()
const { findAllBoats} = require("./service")

exports.getAllBoats = async (req, res) => {
  try {
    
    const foundBoats = await findAllBoats()

    if (!foundBoats) {
      return res.status(404).json("No Boat Found")
    }

    return res.json(foundBoats)
  } catch (error) {
    console.log(error)
    return res.status(500).json()
  }
}