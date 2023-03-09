module.exports = class UserService {
    isNameValid(name) {
        if (!name) {
            return false
        }
        const separatedName = name.split(' ')

        if (!separatedName[1] || separatedName[1].length < 1) {
            return false
        }
        return true
    }

    isEmailValid(email) {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (email.match(validRegex)) {

            return true

        } else {
            return false
        }
    }
}