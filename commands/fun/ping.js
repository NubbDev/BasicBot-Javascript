const { ApplicationCommandType } = require('discord.js');
const client = require('../../index')

module.exports = {
	name: "ping",
	description: "Check bot's ping.",
	type: ApplicationCommandType.ChatInput,
	cooldown: 100,
	run: (interaction) => {
		interaction.reply(`🏓 Latency is **${interaction.createdTimestamp - Date.now()}ms**. API Latency is **${Math.round(client.ws.ping)}ms**`);
	},
};