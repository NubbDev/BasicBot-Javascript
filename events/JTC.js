const { VoiceState, ChannelType } = require('discord.js')
const client = require('../index.js')

/**
 * @param {VoiceState} oldState;
 * @param {VoiceState} newState;
 */

client.on('voiceStateUpdate', async(oldState, newState) => {
    const guildId = '986976198108254218'
    const guild = client.guilds.cache.get(guildId)

    const member = newState?.member;
    const oldChannel = oldState.channel;
    const newChannel = newState?.channel;
    const joinToCreate = "996481927139836004"

    const JTChannel = guild.channels.cache.get(joinToCreate)

    if(oldChannel !== newChannel && newChannel && newChannel.id === joinToCreate) {
        const vc = await guild.channels.create({
            name: `${member.user.username}#${member.user.discriminator}`,
            type: ChannelType.GuildVoice,
            parent: "996247736431153192",
            permissionOverwrites: [
                {id: member.id, allow: ["Connect"]},
                {id: guild.id, deny: ["Connect"]}
            ]
        });
        client.voiceGenerator.set(member.id, vc.id);
        await newChannel.permissionOverwrites.edit(member, {Connect: false});

        return setTimeout(() => member.voice.setChannel(vc), 500)
    }
    const ownerChannel = client.voiceGenerator.get(member.id);
    if (ownerChannel && oldChannel.id == ownerChannel && (!newChannel || newChannel.id !== ownerChannel)) {
        client.voiceGenerator.set(member.id, null)
        JTChannel.permissionOverwrites.delete(member)
        oldChannel.delete().catch(() => {})
    }
})