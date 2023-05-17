const mod = {}

mod.errors = {

    missing: {
        type: 0,
        description: "Start or destination query parameter missing."
    },

    airportNotExist: {
        type: 1,
        description: "The start or destination airport don't exist."
    }
}


module.exports = mod;