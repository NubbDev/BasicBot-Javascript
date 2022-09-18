const client = require('../index.js')
// const levels = require('../models/Users')
const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv')
dotenv.config()
const Users = require('../models/Users.js')
const welcome = require('../data/canvas/welcome-canvas.js')
const abbrNum = require('../data/functions/abbrNum.js')

client.on('guildMemberAdd', async (member) => {

    const channelId = '996891767188230194'
    const guild = client.guilds.cache.get('986976198108254218')
    const members = abbrNum(guild.members.cache.filter(member => !member.user.bot).size, 2)
    
    const text = [`${member} just joined the server - glhf!`, `${member} just joined. Everyone, look busy!`, `${member} just joined. Can I get a heal?`, `${member} joined your party.`, `${member} joined. You must construct additional pylons.`, `Ermagherd. ${member} is here.`, `Welcome, ${member}. Stay awhile and listen.`, `Welcome, ${member}. We were expecting you ( ͡° ͜ʖ ͡°)`, `Welcome, ${member}. We hope you brought pizza.`, `Welcome ${member}. Leave your weapons by the door.`, `A wild ${member} appeared.`, `Swoooosh. ${member} just landed.`, `Brace yourselves. ${member} just joined the server.`, `${member} just joined. Hide your bananas.`, `${member} just arrived. Seems OP - please nerf.`, `${member} just slid into the server.`, `A ${member} has spawned in the server.`, `Big ${member} showed up!`, `Where’s ${member}? In the server!`, `${member} hopped into the server. Kangaroo!!`, `${member} just showed up. Hold my beer.`,]
    const text2 = [`${member.user.username}#${member.user.discriminator} just joined the server - glhf!`, `${member.user.username}#${member.user.discriminator} just joined. Everyone, look busy!`, `${member.user.username}#${member.user.discriminator} just joined. Can I get a heal?`, `${member.user.username}#${member.user.discriminator} joined your party.`, `${member.user.username}#${member.user.discriminator} joined. You must construct additional pylons.`, `Ermagherd. ${member.user.username}#${member.user.discriminator} is here.`, `Welcome, ${member.user.username}#${member.user.discriminator}. Stay awhile and listen.`, `Welcome, ${member.user.username}#${member.user.discriminator}. We were expecting you ( ͡° ͜ʖ ͡°)`, `Welcome, ${member.user.username}#${member.user.discriminator}. We hope you brought pizza.`, `Welcome ${member.user.username}#${member.user.discriminator}. Leave your weapons by the door.`, `A wild ${member.user.username}#${member.user.discriminator} appeared.`, `Swoooosh. ${member.user.username}#${member.user.discriminator} just landed.`, `Brace yourselves. ${member.user.username}#${member.user.discriminator} just joined the server.`, `${member.user.username}#${member.user.discriminator} just joined. Hide your bananas.`, `${member.user.username}#${member.user.discriminator} just arrived. Seems OP - please nerf.`, `${member.user.username}#${member.user.discriminator} just slid into the server.`, `A ${member.user.username}#${member.user.discriminator} has spawned in the server.`, `Big ${member.user.username}#${member.user.discriminator} showed up!`, `Where’s ${member.user.username}#${member.user.discriminator}? In the server!`, `${member.user.username}#${member.user.discriminator} hopped into the server. Kangaroo!!`, `${member.user.username}#${member.user.discriminator} just showed up. Hold my beer.`,]
    const i = Math.floor(Math.random() * (text.length))

    console.log(text2[i])
    const channel = (client.channels.cache.get(channelId));
    const {attachment} = await welcome(member, text2[i], members)
    channel.send({content: text[i], files: [attachment]})

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