const fs = require('node:fs')
const AsciiTable = require('ascii-table')

let table = new AsciiTable()
table.setHeading('Events', 'Stats')

module.exports = () => {
    fs.readdirSync(`./events/`).filter(file => file.endsWith('.js')).forEach(events => {
        require(`../events/${events}`)
        table.addRow(events.split('.js')[0], '✅')
    })
    console.log(table.toString())
}