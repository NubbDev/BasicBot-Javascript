const client = require('../index.js');
const { WebhookClient } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

// Import all the embeds templates
const deleteEmbed = require('../data/template/message-delete.js');

const web = new WebhookClient({id: '1013179498558148608', token: process.env.LOGSID});

client.on('messageDelete', async (message) => {
    console.log(`A message by ${message.author.tag} was deleted, but we don't know by who yet.`)
    if (message.partial) {
        try {
            await message.fetch();
        } catch (err) {
            console.log(err);
        }
    }
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (message.channel.type === 'news') return;
    if (message.channel.type === 'store') return;
    
    if (message.channel.type === 'text') {
        const {embed} = deleteEmbed(message);
        web.send(
            {   
                content: `Message Deleted`,
                username: 'Message Deleted',
                embeds: [embed]
            }
        );
    }
})
