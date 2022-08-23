const client = require('../index.js')
// const levels = require('../models/Users')
const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv')
dotenv.config()
const Users = require('../models/Users.js')

client.on('guildMemberAdd', async (member) => {

    const channelId = '996891767188230194'
    const memberRole = '988684522839212113'

    const text = [`${member} just joined the server - glhf!`, `${member} just joined. Everyone, look busy!`, `${member} just joined. Can I get a heal?`, `${member} joined your party.`, `${member} joined. You must construct additional pylons.`, `Ermagherd. ${member} is here.`, `Welcome, ${member}. Stay awhile and listen.`, `Welcome, ${member}. We were expecting you ( ͡° ͜ʖ ͡°)`, `Welcome, ${member}. We hope you brought pizza.`, `Welcome ${member}. Leave your weapons by the door.`, `A wild ${member} appeared.`, `Swoooosh. ${member} just landed.`, `Brace yourselves. ${member} just joined the server.`, `${member} just joined. Hide your bananas.`, `${member} just arrived. Seems OP - please nerf.`, `${member} just slid into the server.`, `A ${member} has spawned in the server.`, `Big ${member} showed up!`, `Where’s ${member}? In the server!`, `${member} hopped into the server. Kangaroo!!`, `${member} just showed up. Hold my beer.`,]
    const i = Math.floor(Math.random() * (text.length))

    console.log(text[i])
    const channel = (client.channels.cache.get(channelId));
    channel.send({content: text[i],/* files: [img]*/})
    member.roles.add(memberRole)

    const db = client.database.db("KingsData").collection("Users")
    const query = {_id: member.id};
    const result = await db.findOne(query);

    console.log(result)



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

    // if (dbo.find(query) === `${member.id}`) {
    //     
    // } else {
    //     

    
    // const newUser = new levels({
    //     userID: member.id,
    //     guildID: process.env.GUILDID
    // });
      
    // await newUser.save().catch(e => console.log(`Failed to create user: ${e}`))
})