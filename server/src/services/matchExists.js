const matchExists = (users, yesVotes) => {
  return Object.keys(users).length === yesVotes.length
}

export default matchExists