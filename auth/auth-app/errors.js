const mod = {}

mod.missing = {
    error: {
        type: 0,
        description: "Email or password is missing."
    }
}

mod.inexistence = {
    error: {
        type: 1,
        description: "This account doesn't exist."
    }
}

mod.wrong = {
    error: {
        type: 2,
        description: "The password is wrong."
    }
}

mod.emailFormat = {
    error: {
        type: 3,
        description: "This email isn't valid."
    }
}

mod.alreadyExist = {
    error: {
        type: 4,
        description: "This email is already registed."
    }
}


module.exports = mod;