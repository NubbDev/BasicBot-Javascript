const { ApplicationCommandType } = require('discord.js');
const client = require("../../index.js");

module.exports = {
    name: 'send',
    description: 'Send a message to a channel',
    type: ApplicationCommandType.ChatInput,
    options: [
        {name: 'text', description: "embed name", type: 3, required: true}, 
        {name: 'channel', description: "Channel to send too", type: 7}, 
    ],

	run: async (interaction) => {
        const text = interaction.options.getString('text');
        const channel = interaction.options.getChannel('channel') ?? interaction.channel;

        channel.send(text)
        interaction.reply({content: `Sent message to ${channel}`, ephemeral: true})
    }
};

