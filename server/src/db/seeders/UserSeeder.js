import { User } from "../../models/index.js"
import Bcrypt from "bcrypt"

class UserSeeder {
  static async seed() {
    const users = [
      {
        email: "tim@dev.com",
        firstName: "Tim",
        cryptedPassword: Bcrypt.hashSync("daddy", 10)
      },
      {
        email: "kia@dev.com",
        firstName: "Clare",
        cryptedPassword: Bcrypt.hashSync("unit", 10)
      },
    ]

    for (const user of users) {
      const currentUser = await User.query().findOne(user)
      if (!currentUser) {
        await User.query().insert(user)
      }
    }
  }
}

export default UserSeeder