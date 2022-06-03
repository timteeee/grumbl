import express from "express"
import { Room } from "../../../models/index.js"
import { ValidationError } from "objection"

const roomRouter = new express.Router()

roomRouter.get("/new", async (req, res) => {
  try {
    const openRoom = await Room.query().findOne({ hostId: req.user.id, open: true })
    if (!openRoom) {
      const newRoom = await Room.query().insertAndFetch({ hostId: req.user.id })
      return res.status(201).json({ roomId: newRoom.id })
    } else {
      return res.status(200).json({ roomId: openRoom.id })
    }
  } catch(errors) {
    console.log(errors)
    if (errors instanceof ValidationError) {
      return res.status(422).json(errors.data)
    }
    return res.status(500).json(errors)
  }
})

export default roomRouter