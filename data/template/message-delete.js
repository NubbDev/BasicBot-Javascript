const { EmbedBuilder } = require('discord.js');
function deleteEmbed(message) { 
    const time = Math.round(message.createdTimestamp / 1000);
    const embed = new EmbedBuilder()
    embed.setColor('#ff0000');
    embed.setAuthor({name: `${message.author.username}#${message.author.discriminator}`, iconURL: message.author.avatarURL()});
    embed.setTitle('Message Deleted');
    embed.setDescription(`Message by ${message.author} deleted in ${message.channel}`);
    embed.addFields(
        {name: "Content", value: message.content},
        {name: "Date", value: `<t:${time}:F>`},
        {name: "IDs", value: `\`\`\`ini\nuser: ${message.author.id}\nChannel ID: ${message.id}\n\`\`\``},
        );
    embed.setTimestamp();
    embed.setThumbnail(message.author.avatarURL());
    return embed;
}

module.exports = deleteEmbed;