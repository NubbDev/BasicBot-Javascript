const { ApplicationCommandType} = require('discord.js');
// const dl = require('../../discord-leveling')

module.exports = {
        name: 'clear',
        description: 'Clear X amount of messages',
        type: ApplicationCommandType.ChatInput,

        options: [
                {name: 'amount', description: "Specify The number of messages", type: 4, required: true}
        ],

	run: async (interaction) => {
                const amount = interaction.options.getInteger('amount')

                const messages = await interaction.channel.messages.fetch({limit: amount})
                const {size} = messages;
                messages.forEach(message => message.delete())

                interaction.channel.send(`${size} messages we're delete`)
                interaction.reply({content: `You deleted ${size} messages`, ephemeral: true})
	}
};