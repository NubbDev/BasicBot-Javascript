const client = require('../index.js');

client.on('guildMemberAdd', async (member) => {
    const db = await client.database.db("KingsData").collection("Punishments") 
    const results = await db.findOne({_id: member.id, type: 'mute'});
    const guild = await client.guilds.fetch("986976198108254218")

    if (results) {
        const muteRole = await guild.roles.fetch('996220641017606145')
        member.roles.add(muteRole)
        console.log(`${member.username} was muted`)
    }
})
client.on('ready', async () => {
    setInterval(async () => {
        const db = await client.database.db("KingsData").collection("Punishments") 
        const query = {
            expires: {$lt: new Date()}
        }
        const results = await db.find(query).toArray();

        for (const res of results) {
            const {_id, type} = res
            const guild = await client.guilds.fetch("986976198108254218")
            if (type === "ban") {
                guild.members.unban(_id, 'Ban Expired');
                console.log(`${_id} is now unbanned`)
            } else if (type === "mute") {
                const muteRole = await guild.roles.fetch("996220641017606145");
                const member = await guild.members.fetch(_id);
                if (!member) {
                    continue;
                }
                member.roles.remove(muteRole)
                console.log(`${_id} is now unmuted`)
            }
        }
        await db.deleteMany(query);
    }, 30000)
})