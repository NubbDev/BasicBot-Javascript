const client = require('../index.js')
const dotenv = require('dotenv')

client.on('guildMemberAdd', async (member) => {
    const db = await client.database.db("KingsData").collection("Users") 
    const result = await db.findOne({_id: member.id});
    const guild = await client.guilds.fetch("986976198108254218");
    const memberRole = '988684522839212113'

    member.roles.add(memberRole)

    if (!result) return;

    if (result) {
        try {
            const {roles} = await result;
            if (member.bot) {
                return;
            };
            console.log(roles)
            // for (const role of roles){
            //     console.log(role)
            //     try{
            //         // if (role === "988684522839212113") {
            //         //     return
            //         // }
            //         // member.roles.add(role)
            //     } catch(err) {
            //         console.log(err)
            //     }
            // }
        } catch(err) {
            console.log(err)
        }
    }
})

client.on('guildMemberUpdate', async (member) => {
    const db = client.database.db("KingsData").collection("Users");
    const query = {_id: member.id};
    const result = await db.findOne(query);
    

    const roleList = await member.roles.cache.map(r =>{
        if (r.id === "988684522839212113"){
            return
        }
        r.id
    })

    db.updateOne(query, {$set: {roles: roleList}})
    console.log(`Updated ${member.user.username}\'s roles in the Database`)
})