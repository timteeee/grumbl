import express from "express"
import v4 from "uuid"

const roomRouter = new express.Router()

roomRouter.post("/new", (req, res) => {
  try {
    return res.status(201).json({ roomId: v4() })
  } catch(errors) {
    return res.status(500).json({ errors })
  }
})

export default roomRouter