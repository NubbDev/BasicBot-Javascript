const { ApplicationCommandType } = require('discord.js');
const client = require("../../index.js")
const fs = require('node:fs')

module.exports = {
    name: 'embed',
    description: 'Find the rank of a user',
    type: ApplicationCommandType.ChatInput,
    options: [
        {name: 'send', description: "Send a embed", type: 1, options: [
            {name: 'channel', description: "Channel to send too", type: 7, required: true}, 
            {name: 'name', description: "embed name", type: 3, required: true}, 
        ]},
        {name: 'edit', description: "Configure Music Volume", type: 1, options: [
            {name: 'channel', description: "Channel the message is from", type: 7, required: true}, 
            {name: 'message', description: "Message to edit", type: 3, required: true}, 
            {name: 'name', description: "embed name", type: 3, required: true}, 
        ]},
    ],

	run: async (interaction) => {
        const embedName = interaction.options.getString('name');
        const channel = interaction.options.getChannel('channel');
        const embeds = [];
        const embedFiles = fs.readdirSync(`./data/embeds`).filter(file => file.endsWith('.json'))
        for (const file of embedFiles) {
            const embed = require(`../../data/embeds/${file}`)
            embeds.push({
                name: embed.name,
                content: {
                    embeds: embed.embeds ? embed.embeds : null,
                    components: embed.components ? embed.components : null
                }
            })
        }
        const embedIndex = embeds.findIndex(i => i.name.toLowerCase() === embedName.toLowerCase())
        const embedFile = embeds[embedIndex].content
        if (!embedFile) {
            interaction.reply({content: `Embed not found`, ephemeral: true})
            return;
        }

        switch(interaction.options.getSubcommand()) {
            case 'send': {
                channel.send({embeds: embedFile.embeds, components: embedFile.components})
                interaction.reply({content: `Sent embed to ${channel}`, ephemeral: true})
            } break;
            case 'edit': {
                const messageid = interaction.options.getString('message');

                const message = await channel.messages.fetch(messageid,{cache: true, force: true})
                if (!message) {
                    interaction.reply({content: `Message not found`, ephemeral: true})
                    return;
                }
                message.edit({embeds: embedFile.embeds, components: embedFile.components})
                interaction.reply({content: `Edited message`, ephemeral: true})
            } break;
        }
    }
};

