const { mongoose } = require('@novel-systems/shared')
const Promise = require('bluebird')

module.exports = {
    index: 21,
    name: '21-add-recruiters-to-event',
    description:
        'Add recruiters in to event, add recruiter events to user profioles and removo recruiter organisations',

    run: async () => {
        const ares = await mongoose.model('Event').updateMany(
            { recruiters: { $exists: false } },
            { $set: { recruiters: [] } }, // TODO: add recruiters from userprofiles here
        )
        console.log('Done with recruiters to event', ares.n, ares.nModified)
        // TODO: breaks wit error MongoError: BSON field 'update.updates.u' is the wrong type 'array', expected type 'object'. fix.
        // const bres = await mongoose
        //     .model('UserProfile')
        //     .updateMany(
        //         { 'recruiterEvents.0': { $exists: true }, recruiterEvents: { $elemMatch: { $type: "string" } } }, // array has at least one element and element type is string, not object
        //         [{
        //             $set: {
        //                 recruiterEvents: {
        //                     $map: {
        //                         input: "$recruiterEvents",
        //                         as: "current",
        //                         in: {
        //                             _id: ObjectId().toString(),
        //                             eventId: "$$current",
        //                             organisation: {
        //                                 $getField: "recruiterOrganisation"
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }])

        // console.log('Done with events to userprofiles', bres.n, bres.nModified)

        const cres = await mongoose
            .model('UserProfile')
            .updateMany(
                { recruiterOrganisation: { $exists: true } },
                { $unset: { recruiterOrganisation: '' } },
            )
        console.log(
            'Done with removing recruiterOrganisations from userprofiles',
            cres.n,
            cres.nModified,
        )

        return Promise.resolve()
    },
}
