const client = require('../index.js')

client.on('ready', () => {
    console.log(`Ready! Logged in as ${client.user.tag}`)
})
