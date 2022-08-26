const { ApplicationCommandType } = require('discord.js');
const client = require("../../index.js")

module.exports = {
        name: 'kick',
        description: 'Find the rank of a user',
        type: ApplicationCommandType.ChatInput,

        options: [
                {name: 'user', description: "Specify User", type: 6, required: true},
                {name: 'reason', description: "Reason for Kick", type: 3, required: false},
        ],

	run: async (interaction) => {
        const target = await interaction.options.getUser('user')
        const reason = await interaction.options.getString('reason')

        try {
            const member = await interaction.guild.members.fetch(target.id);
            if (!reason) {
                interaction.reply({content: `${target} was successfully kicked`, ephemeral: true})
                await target.send(`You we're kicked from King's Paradise\n You are able to join back: https://discord.gg/XnujhVs4dd`)
                .catch(() => { // Do nothing when the user has DMs disabled 
                    console.log("Could not send DM")
                }) 
                interaction.channel.send(`${target} was kicked from the server`)
                await member.kick()
            } else {
                interaction.reply({content: `${target} was successfully kicked`, ephemeral: true})
                interaction.channel.send(`${target} was kicked from the server`)
                await target.send(`You we're kicked from King's Paradise\n Reason: \`${reason}\``)
                .catch(() => { // Do nothing when user has DMs disabled
                    console.log("Could not send DM")
                })
                await member.kick()
            }
        } catch (error){
            interaction.reply({content: `${target} cannot be kicked`, ephemeral: true})
            console.error(error)
        }
	}
};