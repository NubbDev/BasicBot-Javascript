const fetch = require('node-superfetch')
const guildId = '986976198108254218'
const client = require('../index.js')
const abbrNum = require('../abbrNum.js')

client.on('ready', async () => {
    const vc = '996460777131212820'
    const guild = client.guilds.cache.get(guildId)
    const channel = client.channels.cache.get(vc)
    const members = abbrNum(guild.members.cache.filter(member => !member.user.bot).size, 2)

    channel.setName(`👥│Members: ${members}`);
    setInterval(async () => {
        channel.setName(`👥│Members: ${members}`);
    }, 30000)
    client.on('guildMemberAdd', async (member) => {
        channel.setName(`👥│Members: ${members}`)
        console.log(`${guild.name} has ${members} members`)
    })
    client.on('guildMemberRemove', () => {
        channel.setName(`👥│Members: ${members}`)
        console.log(`${guild.name} has ${members} members`)
    })
    console.log(`${guild.memberCount} members in counting`)
})

client.on('ready', async () => {
    const vc = '996257057235795968'
    const channel = client.channels.cache.get(vc)
    const name = "UC0UetqANVOipDeOLx08dffg"
    let data = await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${name}&key=${process.env.YOUTUBEAPI}`)
    let subCount = abbrNum((data.body.items[0].statistics.subscriberCount), 2)
    channel.setName(`📌│Youtube: ${subCount.toString()}`); 
    setInterval(async() => {
        let data = await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${name}&key=${process.env.YOUTUBEAPI}`)
        let subCount = abbrNum((data.body.items[0].statistics.subscriberCount), 2)
        channel.setName(`📌│Youtube: ${subCount.toString()}`); 
    }, 300000)
    console.log(`Subscriber Count: ${subCount.toString()} subs`)
})
