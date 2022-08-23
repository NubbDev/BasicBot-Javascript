const { ApplicationCommandType } = require('discord.js');
const client = require("../../index.js")

module.exports = {
        name: 'rank',
        description: 'Find the rank of a user',
        type: ApplicationCommandType.ChatInput,

        options: [
                {name: 'user', description: "Specify User", type: 6, required: false}
        ],

	run: async (interaction) => {
                const user = interaction.options.getUser('user') ?? interaction.user
                const db = client.database.db("KingsData").collection("Users")
                const query = {_id: user.id};     
                const result = await db.findOne(query);
                
                if (!result) {interaction.reply({content: `${user} has no levels or xp`, ephemeral: true})}
                else {
                        const {level, xp} = await result
                        interaction.reply(`Hey ${user}! You have ${level} level(s)!${xp} xp!`)
                }
	}
};