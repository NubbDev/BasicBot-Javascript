const client = require('../index.js')
const dotenv = require('dotenv')

const Users = require('../models/Users.js')
dotenv.config()
// const Levels = require("discord-xp")

const giveLevel = async (level, message, member) => {

    const rank = ["1012742729815556158", "1012743038507954186", "1012743141998198794", "1012743258016854086", "1012743553186803803", "1012743621616881725", "1012743726361214986"]


    if (level >= 5 && level < 10) {
        const role = message.guild.roles.cache.get(rank[0])
        member.roles.add(role)
    } else if (level >= 10 && level > 20) {
        const role = message.guild.roles.cache.get(rank[1])
        member.roles.add(role)
    } else if (level >= 20 && level > 35) {
        const role = message.guild.roles.cache.get(rank[2])
        member.roles.add(role)
    } else if (level >= 35 && level > 50) {
        const role = message.guild.roles.cache.get(rank[3])
        member.roles.add(role)
    } else if (level >= 50 && level > 75) {
        const role = message.guild.roles.cache.get(rank[4])
        member.roles.add(role)
    } else if (level >= 75 && level > 100) {
        const role = message.guild.roles.cache.get(rank[5])
        member.roles.add(role)
    } else if (level >= 100) {
        const role = message.guild.roles.cache.get(rank[6])
        member.roles.add(role)
    }
}

client.on('messageCreate', async message => {
    const messageAuthor = message.author;
    const member = messageAuthor;
    if (!message.guild) return;
    if (messageAuthor.bot) return;
    
    const messageArray = message.content.split('')
    const xpAdded = messageArray.length > 200 ? Math.floor(Math.random() * 200) + 100 : Math.floor(Math.random() * messageArray.length) + Math.round(messageArray.length / 5)

    await client
    const db = client.database.db("KingsData").collection("Users")
    const query = {_id: member.id};
    const result = await db.findOne(query);
    

    
    const obj = {...Users,
        _id: member.id,
        xp: xpAdded,
        messages: 1,
        totalXp: xpAdded,
        username: member.username,
        discriminator: member.discriminator,
        avatar: member.displayAvatarURL({dynamic: true}),
    }
    
    var user;
    if (!result) {
        db.insertOne(obj, (err) => {if (err) throw err})
        var setUser = await db.findOne(query)
        user = setUser;
    } else {
        user = result;
        db.updateOne(query, {$inc: {
            xp: xpAdded, 
            messages: 1, 
            totalXp: xpAdded
        }, $set: {
            username: member.username, 
            discriminator: member.discriminator, 
            avatar: member.displayAvatarURL({dynamic: true})
        }})
    }
    
    console.log(`______________\nUser ${messageAuthor.username}#${messageAuthor.discriminator} was given ${xpAdded} xp.\nMessage was ${message.content} with ${messageArray.length} characters\n‾‾‾‾‾‾‾‾‾‾‾‾‾‾`);
    function getNeededXP(lvl) {
        const ans = (5 * (lvl * lvl) + (50 * lvl)) + 100
        return ans;
    }
    let {xp, level} = await result
    
    
    const needed = getNeededXP(level)
    if (xp >= needed) {
        level++;
        await db.updateOne(query, {$inc: {xp: -needed, level: 1}, });
        giveLevel(level, message, member);
        message.reply(`GG <@${messageAuthor.id}>, you're now level ${level}`);
    }
})

