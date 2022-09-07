const { EmbedBuilder } = require("discord.js");

exports.replySuccess = (interaction, message) => {
    const embed = new EmbedBuilder()
        .setTitle("Success!")
        .setDescription(message)
        .setColor(6356824)
        .setTimestamp();
    
    interaction.reply({ embeds: [embed], ephemeral: true });
};

exports.replyError = (interaction, message) => {
    const embed = new EmbedBuilder()
        .setTitle("Error!")
        .setDescription(message)
        .setColor(16711680)
        .setTimestamp();
    
    interaction.reply({ embeds: [embed], ephemeral: true });
};