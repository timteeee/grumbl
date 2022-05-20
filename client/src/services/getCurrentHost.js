export default () => {
  return process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://grumbl.herokuapp.com/"
}