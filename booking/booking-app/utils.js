const mod = {}

mod.errors = {
    invalidToken: {
        type: 1,
        description: 'Invalid user token!'
    },
    missingFlight: {
        type:2,
        description: 'Missing flight id!'
    }
}

module.exports = mod;