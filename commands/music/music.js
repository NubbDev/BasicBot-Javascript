const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const {client} = require('../../index.js');

module.exports = {
        name: 'music',
        description: 'complete music commands',
        type: ApplicationCommandType.ChatInput,

        options: [
                {name: 'play', description: "Play a song", type: 1, options: [{name: 'music', description: "request a song", type: 3, required: true}]},
                {name: 'volume', description: "Configure Music Volume", type: 1, options: [{name: 'percentage', description: "Percentage of volume", type: 3, required: true}]},
                {name: 'stop', description: "Stop Music", type: 1},
                {name: 'pause', description: "Pause Music", type: 1},
                {name: 'queue', description: "Add to Queue", type: 1},
                {name: 'skip', description: "Skip a song", type: 1},
                {name: 'resume', description: "Resume the song", type: 1},
            ],

	run: async (interaction) => {
                const {options, channel, member, guild} = interaction;
                const subCommand = options.getSubcommand();
                const vc = member.voice.channel;
                if (!vc) return interaction.reply({content: 'You need to be in a voice channel to use this command!', ephemeral: true});
                if (guild.client.voice.channel && guild.client.voice.channel.id !== member.voice.channel.id) return interaction.reply({content: 'You need to be in the same voice channel as the bot to use this command!', ephemeral: true});

                switch(subCommand) {
                        case 'play': {
                                const music = options.getString('music');
                                client.music.play(vc, music);
                        }break; 
                        case 'volume': {
                                const percentage = options.getInteger('percentage');
                        } break; 
                        case 'stop': {} break;
                        case 'pause': {} break;
                        case 'queue': {} break;
                        case 'skip': {} break;
                        case 'resume': {} break;
                }
        }      
}