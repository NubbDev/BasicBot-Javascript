const client = require('../index.js')
// const levels = require('../models/Users')
const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv')
dotenv.config()
const Users = require('../models/Users.js')
const welcome = require('../data/canvas/welcome-canvas.js')
const abbrNum = require('../data/functions/abbrNum.js')

client.on('guildMemberAdd', async (member) => {

    const channelId = '988709552373510144'
    const memberRole = '988684522839212113'
    const guild = client.guilds.cache.get('986976198108254218')
    const members = abbrNum(guild.members.cache.filter(member => !member.user.bot).size, 2)
    
    const text = [`${member} just joined the server - glhf!`, `${member} just joined. Everyone, look busy!`, `${member} just joined. Can I get a heal?`, `${member} joined your party.`, `${member} joined. You must construct additional pylons.`, `Ermagherd. ${member} is here.`, `Welcome, ${member}. Stay awhile and listen.`, `Welcome, ${member}. We were expecting you ( ͡° ͜ʖ ͡°)`, `Welcome, ${member}. We hope you brought pizza.`, `Welcome ${member}. Leave your weapons by the door.`, `A wild ${member} appeared.`, `Swoooosh. ${member} just landed.`, `Brace yourselves. ${member} just joined the server.`, `${member} just joined. Hide your bananas.`, `${member} just arrived. Seems OP - please nerf.`, `${member} just slid into the server.`, `A ${member} has spawned in the server.`, `Big ${member} showed up!`, `Where’s ${member}? In the server!`, `${member} hopped into the server. Kangaroo!!`, `${member} just showed up. Hold my beer.`,]
    const text2 = [`${member.username}#${member.discriminator} just joined the server - glhf!`, `${member.username}#${member.discriminator} just joined. Everyone, look busy!`, `${member.username}#${member.discriminator} just joined. Can I get a heal?`, `${member.username}#${member.discriminator} joined your party.`, `${member.username}#${member.discriminator} joined. You must construct additional pylons.`, `Ermagherd. ${member.username}#${member.discriminator} is here.`, `Welcome, ${member.username}#${member.discriminator}. Stay awhile and listen.`, `Welcome, ${member.username}#${member.discriminator}. We were expecting you ( ͡° ͜ʖ ͡°)`, `Welcome, ${member.username}#${member.discriminator}. We hope you brought pizza.`, `Welcome ${member.username}#${member.discriminator}. Leave your weapons by the door.`, `A wild ${member.username}#${member.discriminator} appeared.`, `Swoooosh. ${member.username}#${member.discriminator} just landed.`, `Brace yourselves. ${member.username}#${member.discriminator} just joined the server.`, `${member.username}#${member.discriminator} just joined. Hide your bananas.`, `${member.username}#${member.discriminator} just arrived. Seems OP - please nerf.`, `${member.username}#${member.discriminator} just slid into the server.`, `A ${member.username}#${member.discriminator} has spawned in the server.`, `Big ${member.username}#${member.discriminator} showed up!`, `Where’s ${member.username}#${member.discriminator}? In the server!`, `${member.username}#${member.discriminator} hopped into the server. Kangaroo!!`, `${member.username}#${member.discriminator} just showed up. Hold my beer.`,]
    const i = Math.floor(Math.random() * (text.length))

    console.log(text2[i])
    const channel = (client.channels.cache.get(channelId));
    const {attachment} = await welcome(member, text2[i], members)
    channel.send({content: text[i], files: [attachment]})
    // member.roles.add(memberRole)

    const db = client.database.db("KingsData").collection("Users")
    const query = {_id: member.id};
    const result = await db.findOne(query);

    await result
    try{
        if (result === null || !result) {
            const obj = {...Users,
                        _id: member.id,
                        userId: member.id,
                    }
            db.insertOne(obj, (err, res) => {
            if (err) throw err;
            console.log("New User Added")
            })
        } else if (result._id === member.id) {
            console.log("User already stored in database")
            return;
        } else {
            console.log("Error searching for user data")
            return;
        }
    } catch(error) {
        console.log(error)
    }
})