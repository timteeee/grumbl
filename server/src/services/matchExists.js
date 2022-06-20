const matchExists = (userIds, yesVotes) => {
  for (const userId of userIds) {
    const voteFromUser = yesVotes.find(vote => vote.userId === userId)
    if (!voteFromUser) {
      return false
    }
  }

  return true
}

export default matchExists