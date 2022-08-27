const { ApplicationCommandType } = require('discord.js');
const client = require("../../index.js")
const canvacord = require('canvacord');

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

                function getNeededXP(lvl, xp) {
                        const ans = ((5 * (lvl * lvl) + (50 * lvl)) + 100) - xp
                        return ans;
                }

                

                if (!result) {interaction.reply({content: `${user} has no levels or xp`, ephemeral: true})}
                else {
                        const {level, xp} = await result
                        const neededXP = await getNeededXP(level+1, 0)

                        const rank = new canvacord.Rank()
                                .setAvatar(user.displayAvatarURL({dynamic: false, format: 'png'}))
                                .setCurrentXP(xp)
                                .setRequiredXP(neededXP)
                                .setCustomStatusColor('#ffd966')
                                .setProgressBar("#ffd966", "COLOR")
                                .setLevelColor(number = "#ffd966")
                                .setRankColor(number = "#ffd966")
                                .setUsername(user.username)
                                .setDiscriminator(user.discriminator)
                                .setLevel(level)
                                .setRank(pos);
                                

                        rank.build().then(buffer => {
                                canvacord.write(buffer, "rank.png")
                                interaction.reply({files: ["./rank.png"]})
                        })
                }
	}
};

