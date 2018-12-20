require('dotenv').config()

process.on('SIGINT', () => {
  process.exit()
})

const script = ['build', 'static'].includes(process.env.npm_lifecycle_event!)
  ? process.env.npm_lifecycle_event! : process.env.NODE_ENV || 'development'

require(`./src/runner/${script}`)
