

// Imports
const jwt = require('jsonwebtoken')
import environment from './environment';


// Auth Middleware
let authMiddleware = function (request, response, next) {
  let token = request.body.token || request.query.token || request.headers['x-access-token'] || request.cookies.token

  if (token && token != 'null') {
    request.user = jwt.verify(token, environment.AUTH_SECRET)
  } else {
    request.user = {}
  }

  next()
}

// Export
module.exports = authMiddleware
