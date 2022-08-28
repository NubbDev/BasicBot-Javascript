const { ApplicationCommandType } = require('discord.js');
const client = require("../../index.js")
const rankImage = require("../../data/canvas/rank-canvas.js")

module.exports = {
        name: 'rank',
        description: 'Find the rank of a user',
        type: ApplicationCommandType.ChatInput,

        options: [
                {name: 'user', description: "Specify User", type: 6, required: false}
        ],

	run: async (interaction) => {
                let user = interaction.options.getUser('user') ?? interaction.user
                const db = client.database.db("KingsData").collection("Users")
                const query = {_id: user.id};     
                const result = await db.findOne(query);
                const list = await db.find().sort({level: -1, xp: -1}).toArray()
                const pos = await list.findIndex(i => i._id === user.id) + 1

                

                if (!result) {interaction.reply({content: `${user} has no levels or xp`, ephemeral: true})}
                else {
                        const {level, xp} = await result

                        const attachment = await rankImage(user, level, xp, pos)
                        interaction.reply({files: [attachment]})
                }
	}
};