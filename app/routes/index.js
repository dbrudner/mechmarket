const userRoutes = require('./user-routes')
const keyboardRoutes = require('./keyboard-routes')
const reactRoutes = require('./react-routes')

module.exports = function(app, passport) {
    userRoutes(app, passport)
    keyboardRoutes(app)
    reactRoutes(app)
}
