const { ApplicationCommandType } = require('discord.js');
const client = require("../../index.js")
const {replyError, replySuccess} = require('../../data/template/success.js')

module.exports = {
        name: 'sync',
        description: 'Sync User\'s Data',
        type: ApplicationCommandType.ChatInput,

        options: [
                {name: 'user', description: "Specify User", type: 6, required: false}
        ],

	run: async (interaction) => {
                let user = interaction.options.getUser('user') ?? interaction.user;
                const db = client.database.db("KingsData").collection("Users"); 
                const query = {_id: user.id};
                const result = await db.findOne(query);

                if (!result) {
                    replyError(interaction, `${user} has no data saved`)
                } else {
                    try{
                        const {roles} = await result;
                        if (user.bot) {
                            replyError(interaction, "Bots don't have any data to sync")
                        };
                        const roleList = await interaction.guild.members.cache.get(user.id).roles.cache.map(r => r.id)
                        const member = await interaction.guild.members.cache.get(user.id)
                        if (!roles){
                            db.updateOne(query, {$set: {roles: roleList}})
                            console.log(`Added ${user.username}\'s roles to Database`)
                        } else {
                            for (const role of roles){
                                try{
                                    if (!roleList.includes(role)){
                                        member.roles.add(role)
                                    }
                                } catch(err) {
                                    console.log(err)
                                }
                            }
                        }
                        await replySuccess(interaction, `Successfully synced ${user}'s data`)
                    } catch(err) {
                        console.log(err)
                        replyError(interaction, `Error: ${err}`)
                    }
                }
	}
};