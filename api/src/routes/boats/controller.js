require("dotenv").config()
const { findAllBoats, findBoatById, modifyBoat} = require("./service")

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

exports.updateBoat = async (req, res) => {
	const boatId = req.params.id
  console.log('boatId: ', boatId)
	const newBoatData = req.body
  console.log(newBoatData)
	try {
      const updatedBoat = await modifyBoat(
			newBoatData,
			boatId
		)
		return res.json(updatedBoat)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}

exports.showBoatById = async (req, res) => {
	try {
		const foundBoat = await findBoatById(req.params.id)

		if (!foundBoat) {
			return res.status(404).json('No Boat Found')
		}

		return res.json(foundBoat)
	} catch (error) {
		console.log(error)
		return res.status(500).json()
	}
}