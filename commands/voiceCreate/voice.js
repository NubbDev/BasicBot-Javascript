const { ApplicationCommandType } = require('discord.js');
const client = require('../../index')

module.exports = {
	name: "voice",
	description: "Control your created vc",
	type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'invite',
            description: 'Invite a User to channel',
            type: 1,
            options: [
                {
                    name: 'member',
                    type: 6,
                    description: 'Tag the user wanted to be invited',
                    require: true,
                }
            ]
        },
        {
            name: 'remove',
            description: 'Remove a User to channel',
            type: 1,
            options: [
                {
                    name: 'member',
                    type: 6,
                    description: 'Tag the user wanted to be invited',
                    require: true,
                }
            ]
        },
        {
            name: 'name',
            description: 'Change channel name',
            type: 1,
            options: [
                {
                    name: 'text',
                    type: 3,
                    description: 'Provide a Name',
                    require: true,
                }
            ]
        },
        {
            name: 'public',
            description: 'Change channel name',
            type: 1,
            options: [
                {
                    name: 'turn',
                    type: 5,
                    description: 'true or false',
                    require: true,
                }
            ]
        },
    ],
	cooldown: 100,
	run: (interaction) => {
        const {options, member, guild} = interaction;

        const subCommand = options.getSubcommand();
        const vc = member.voice.channel;
        const ownerChannel = client.voiceGenerator.get(member.id)

        if (!vc) return ({content: "You are not in a voice channel!", ephemeral: true})

        if(!ownerChannel || vc.id !== ownerChannel) return ({content: "You do not own the channel", ephemeral: true})

        switch(subCommand) {
            case "name" : {
                const newName = options.getString("text")
                if (newName.length > 22 || newName.length < 1) return ({content:"Name needs to be **Greater than 1 character** or **Smaller than 22 characters**", ephemeral: true})

                vc.edit({name: newName})
                interaction.reply({ephemeral: true, content: `Name set to ${newName}`})
            } break;
            case "invite" : {
                const target = options.getMember('member')
                vc.permissionOverwrites.edit(target, {Connect: true})

                target.send({ephemeral: true, content: `${member} invited you to join <#${vc.id}>`}).catch(() => {})
                interaction.reply({ephemeral: true, content: `<@${target.id}> was sent the invite`})
            } break;
            case "remove" : {
                const target = options.getMember('member')
                vc.permissionOverwrites.edit(target, {Connect: false})

                if (target.voice.channel && target.voice.channel.id === vc.id) {
                    target.voice.setChannel(null)
                }

                target.send({ephemeral: true, content: `${member} has kicked you from <#${vc.id}>`}).catch(() => {})
                interaction.reply({ephemeral: true, content: `<@${target.id}> was kicked`})
            } break;
            case "public" : {
                const response = options.getBoolean("turn")

                if (response === true) {
                    vc.permissionOverwrites.edit(guild.id, {Connect: true})
                    interaction.reply({ephemeral: true, content: `Vc is now public!`})
                    interaction.channel.send(`<#${vc.id}> is now a public server!`)
                } else if (response === false) {
                    vc.permissionOverwrites.edit(guild.id, {Connect: false})
                    interaction.reply({ephemeral: true, content: `Vc is now private!`})
                    interaction.channel.send(`<#${vc.id}> is now a a private voice Channel!`)
                } 
            } break;
        }
	},
};