const { EmbedBuilder } = require('discord.js');
function deleteEmbed(message) { 
    const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle('Message Deleted')
        .setDescription(`Message by ${message.author.tag} deleted in ${message.channel}`)
        .addField('Message', message.content)
        .setFooter(`Message ID: ${message.id}`)
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
        .setURL(message.url)
    console.log(embed);
    return embed;
}

module.exports = deleteEmbed;