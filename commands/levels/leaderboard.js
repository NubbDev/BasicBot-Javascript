// const leveling = require('../../discord-leveling')
const client = require('../../index.js')
const { ApplicationCommandType } = require('discord.js');

module.exports = {
    name: 'leaderboard',
    description: 'List the top 10 most chatters of the server',
    type: ApplicationCommandType.ChatInput,

run: async (interaction) => {
    let one, two, three, four, five, six, seven, eight, nine, ten;

    leveling.Leaderboard({limit: 10})
    .then(async users => {
        if (users[0]) one = await client.users.cache.get(users[0].userid) 
        if (users[1]) two = await client.users.cache.get(users[1].userid) 
        if (users[2]) three = await client.users.cache.get(users[2].userid)
        if (users[3]) four = await client.users.cache.get(users[3].userid)
        if (users[4]) five = await client.users.cache.get(users[4].userid)
        if (users[5]) six = await client.users.cache.get(users[5].userid)
        if (users[6]) seven = await client.users.cache.get(users[6].userid)
        if (users[7]) eight = await client.users.cache.get(users[7].userid)
        if (users[8]) nine = await client.users.cache.get(users[8].userid)
        if (users[9]) ten = await client.users.cache.get(users[9].userid)
    interaction.reply(
        `My leaderboard:
        1 - ${one && one.tag || 'Nobody Yet'} : ${users[0] && users[0].level || 'None'} : ${users[0] && users[0].xp || 'None'}
        2 - ${two && two.tag || 'Nobody Yet'} : ${users[1] && users[1].level || 'None'} : ${users[1] && users[1].xp || 'None'}
        3 - ${three && three.tag || 'Nobody Yet'} : ${users[2] && users[2].level || 'None'} : ${users[2] && users[2].xp || 'None'}
        4 - ${four && four.tag || 'Nobody Yet'} : ${users[3] && users[3].level || 'None'} : ${users[3] && users[3].xp || 'None'}
        5 - ${five && five.tag || 'Nobody Yet'} : ${users[4] && users[4].level || 'None'} : ${users[4] && users[4].xp || 'None'}
        6 - ${six && six.tag || 'Nobody Yet'} : ${users[5] && users[5].level || 'None'} : ${users[5] && users[5].xp || 'None'}
        7 - ${seven && seven.tag || 'Nobody Yet'} : ${users[6] && users[6].level || 'None'} : ${users[6] && users[6].xp || 'None'}
        8 - ${eight && eight.tag || 'Nobody Yet'} : ${users[7] && users[7].level || 'None'} : ${users[7] && users[7].xp || 'None'}
        9 - ${nine && nine.tag || 'Nobody Yet'} : ${users[8] && users[8].level || 'None'} : ${users[8] && users[8].xp || 'None'}
        10 - ${ten && ten.tag || 'Nobody Yet'} : ${users[9] && users[9].level || 'None'} : ${users[9] && users[9].xp || 'None'}
        `
    )})
}
};