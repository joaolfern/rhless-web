const env = process.env.REACT_APP_ENV
let server = ''

const isProduction = env === 'production'
const isDevelopment = env === 'development'
const isLocal = !isProduction && !isDevelopment

if (isLocal) {
  try {
    const { localConfig } = require('./_localConfig')
    server = localConfig.server || process.env.REACT_APP_SERVER
  } catch (err) {
    console.error(err)
    server = process.env.REACT_APP_SERVER || ''
  }
} else {
  server = process.env.REACT_APP_SERVER || ''
}

export { server }
