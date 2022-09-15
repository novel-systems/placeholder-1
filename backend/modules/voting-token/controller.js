const _ = require('lodash')
const VotingToken = require('./model')

const controller = {}

controller.generateToken = (name, event, createdById) => {
    const token = new VotingToken({ name, event, createdBy: createdById })
    return token.save()
}

controller.updateToken = (id, fields) => {
    return VotingToken.findByIdAndUpdate(id, fields, { new: true })
}

controller.voteWithToken = (id, projectId) => {
    return VotingToken.findByIdAndUpdate(
        id,
        { project: projectId },
        { new: true },
    )
}

controller.getVotesByProject = async event => {
    const votingTokens = await VotingToken.find({
        event,
        isRevoked: false,
        project: { $exists: true },
    })
    const grouped = _.groupBy(votingTokens, 'project')
    const results = Object.keys(grouped).reduce((result, projectId) => {
        const projectVotes = grouped[projectId]
        result.push({
            project: projectId,
            votes: projectVotes.length,
        })
        return result
    }, [])
    const sorted = _.orderBy(results, ['votes'], 'desc')
    return sorted
}

controller.getToken = id => {
    return VotingToken.findById(id)
}

controller.getAllTokensForEvent = eventId => {
    return VotingToken.find({ event: eventId })
}

controller.isValidToken = id => {
    return VotingToken.findById(id).then(token => !!token && !token.isRevoked)
}

controller.revokeToken = id => {
    return VotingToken.findByIdAndUpdate(
        id,
        {
            isRevoked: true,
            revokedAt: Date.now(),
        },
        { new: true },
    )
}

module.exports = controller
