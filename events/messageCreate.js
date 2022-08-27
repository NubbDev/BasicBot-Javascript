// const client = require('../index.js')
// const dotenv = require('dotenv')

// const Users = require('../models/Users.js')
// dotenv.config()
// // const Levels = require("discord-xp")

// client.on('messageCreate', async message => {
//     const messageAuthor = message.author;
//     const member = messageAuthor;
//     if (!message.guild) return;
//     if (messageAuthor.bot) return;
    
//     const messageArray = message.content.split('')
//     const xpAdded = messageArray.length > 200 ? Math.floor(Math.random() * 200) + 100 : Math.floor(Math.random() * messageArray.length) + Math.round(messageArray.length / 5)

//     await client
//     const db = client.database.db("KingsData").collection("Users")
//     const query = {_id: member.id};
//     const result = await db.findOne(query);

//     const obj = {...Users,
//         _id: member.id,
//         userId: member.id,
//         xp: xpAdded,
//     }

//     var user;
//     if (!result) {
//         db.insertOne(obj, (err) => {if (err) throw err})
//         var setUser = await db.findOne(query)
//         user = setUser;
//     } else {
//         user = result;
//         db.updateOne(query, {$inc: {xp: xpAdded, messages: 1, totalXp: xpAdded}})
//     }

//     console.log(`______________\nUser ${messageAuthor.username}#${messageAuthor.discriminator} was given ${xpAdded} xp.\nMessage was ${message.content} with ${messageArray.length} characters\n‾‾‾‾‾‾‾‾‾‾‾‾‾‾`);
//     function getNeededXP(lvl) {
//         const ans = (5 * (lvl * lvl) + (50 * lvl)) + 100
//         return ans;
//     }

//     let {xp, level} = await result
//     const needed = getNeededXP(level)
//     if (xp >= needed) {
//         level++
//         await db.updateOne(query, {$inc: {xp: -needed, level: 1}})
//         message.reply(`GG <@${messageAuthor.id}>, you're now level ${level}`)
//     }
// })

