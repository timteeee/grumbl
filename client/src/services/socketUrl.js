const socketUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://grumbl.herokuapp.com/"

export default socketUrl