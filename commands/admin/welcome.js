const { ApplicationCommandType, UserFlagsBitField } = require('discord.js');
const client = require("../../index.js")

module.exports = {
    name: 'welcome',
    description: 'Find the rank of a user',
    type: ApplicationCommandType.ChatInput,
    options: [
        {name: 'user', description: "Send a embed", type: 6, required: UserFlagsBitField},
    ],

	run: async (interaction) => {
        const user = interaction.options.getUser('user') ?? interaction.user; // If no user is provided, use the user who ran the command
        client.emit('guildMemberAdd', user);
        interaction.reply({content: `Sent welcome message to ${user}`, ephemeral: true})
    }
};

