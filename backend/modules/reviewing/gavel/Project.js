const { mongoose } = require('@novel-systems/shared')
const Settings = require('./settings')

const GavelProjectSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    track: {
        type: String,
    },
    /** TODO: Think of how to add prioritized funtionality, if necessary */
    viewedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GavelAnnotator',
        },
    ],
    skippedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GavelAnnotator',
        },
    ],
    mu: {
        type: Number,
        default: Settings.MU_PRIOR,
        required: true,
    },
    sigmaSq: {
        type: Number,
        default: Settings.SIGMA_SQ_PRIOR,
    },
    // TODO remove this once production is updated
    sigma_sq: {
        type: Number,
    },
})

GavelProjectSchema.methods.setSkippedBy = async function (annotatorId) {
    if (this.skippedBy.indexOf(annotatorId) === -1) {
        this.skippedBy.push(annotatorId)
        return this.save()
    }
    return Promise.resolve()
}

GavelProjectSchema.set('timestamps', true)

/** Index by project and event as we'll be querying by those often */
GavelProjectSchema.index({
    project: 1,
    event: 1,
})

const GavelProject = mongoose.model('GavelProject', GavelProjectSchema)

module.exports = GavelProject
