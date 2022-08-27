const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js');
const ms = require('ms');
const client = require('../index.js');
const config = require('../config.json');

const cooldown = new Collection();

client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
		const slashCommand = client.commands.get(interaction.commandName);
		if (interaction.type == 4) {
			if(slashCommand.autocomplete) {
				const choices = [];
				await slashCommand.autocomplete(interaction, choices)
			}
		}
		try {
			if(slashCommand.cooldown) {
				if(cooldown.has(`slash-${slashCommand.name}${interaction.user.id}`)) return interaction.reply({ content: config.messages["COOLDOWN_MESSAGE"].replace('<duration>', ms(cooldown.get(`slash-${slashCommand.name}${interaction.user.id}`) - Date.now(), {long : true}) ) })
				if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`🚫 ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
						.setColor('Red')
						return interaction.reply({ embeds: [userPerms], ephemeral: true })
					}
					if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`🚫 ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
						.setColor('Red')
						return interaction.reply({ embeds: [botPerms], ephemeral: true })
					}

				}

					await slashCommand.run(interaction);
					cooldown.set(`slash-${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown)
					setTimeout(() => {
							cooldown.delete(`slash-${slashCommand.name}${interaction.user.id}`)
					}, slashCommand.cooldown)
			} else {
				if(slashCommand.userPerms) {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`🚫 ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
						.setColor('Red')
						return interaction.reply({ embeds: [userPerms], ephemeral: true })
					}

				}
					await slashCommand.run(interaction);
			}
		} catch (error) {
				console.log(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
	if (interaction.isButton()) {
		const button = client.buttons.get(interaction.customId);
		try {
			await button.run(interaction);
		} catch (error) {
			console.log(error);
			await interaction.reply({ content: 'There was an error while executing this button!', ephemeral: true });
		}
	}
	if (interaction.isSelectMenu()) {
		const { customId, member, values} = interaction;
		if (interaction.customId.toLowerCase() === ('pingmenu').toLowerCase()) {
			try {
				const component = interaction.component
				const removed = component.options.filter(option => !values.includes(option.value));
				for (const id of removed) {
					member.roles.remove(id.value);
				}
				for (const id of values) {
					member.roles.add(id);
				}
				interaction.reply({ content: 'Roles updated!', ephemeral: true });
			} catch (error) {
				console.log(error);
				await interaction.reply({ content: 'There was an error while executing this select menu!', ephemeral: true });
			}
		}
	}
	
})