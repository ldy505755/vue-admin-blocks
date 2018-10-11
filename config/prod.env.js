'use strict'
let env = process.env.npm_lifecycle_event
switch (env) {
  case 'test':
    env = '"test"'
    break
  case 'release':
    env = '"release"'
    break
  default:
    env = '"production"'
}
module.exports = {
  NODE_ENV: env
}
