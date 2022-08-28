const client = require('../index.js');
const { WebhookClient } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

// Import all the embeds templates
const deleteEmbed = require('../data/template/message-delete.js');

const web = new WebhookClient({id: '1013179498558148608', token: process.env.LOGSID});

client.on('messageDelete', async (message) => {
    const text = await message;

    if (text.author.bot) return;

    if (text.channel.type !== 0) return;
    if (text.channel.type === 0) {
        const time = Math.round(text.createdTimestamp / 1000);
        const embed = await deleteEmbed(text);
        try {
            await web.send({
                username: "King's Resort Logs",
                avatarURL: "https://www.pngall.com/wp-content/uploads/4/Settings-PNG-Images.png",
                embeds: [embed]
            });
        } catch (error) {
            console.log(error);
        }
    }
})
