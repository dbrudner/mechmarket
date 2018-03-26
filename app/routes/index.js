const userRoutes = require('./user-routes')
const keyboardRoutes = require('./keyboard-routes')
const reactRoutes = require('./react-routes')

module.exports = function (app, passport) {
    // Gets all keyboards
    keyboardRoutes.getAllKeyboards(app, '/api/keyboards/all')

    // Post a new keyboard
    keyboardRoutes.postKeyboard(app, '/api/new/keyboard')

    // Get one keyboard
    keyboardRoutes.getOneKeyboard(app, '/keyboard/:id')

    // Checks if a user is logged in
    userRoutes.test(app, '/test')

    // Logs a user out
    userRoutes.logout(app, '/logout')

    // Logs a user in
    userRoutes.login(app, passport, '/login')

    // Signs up
    userRoutes.signup(app, passport, '/signup')
}