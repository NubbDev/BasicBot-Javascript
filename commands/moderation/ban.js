const { ApplicationCommandType } = require('discord.js');
const client = require("../../index.js")
const splitData = require('../../data/functions/splitData')
const Punishments = require('../../models/Punishments.js')

module.exports = {
        name: 'ban',
        description: 'ban a user',
        type: ApplicationCommandType.ChatInput,

        options: [
                {name: 'user', description: "Specify User", type: 6, required: true},
                {name: 'duration', description: "Specify User", type: 3,
                // choices:[
                //     {name: "60 secs", value: 60},
                //     {name: "5 mins", value: 300},
                //     {name: "10 mins", value: 600},
                //     {name: "1 hour", value: 3600},
                //     {name: "1 day", value: 86400},
                //     {name: "1 week", value: 604800},
                //     {name: "1 month", value: 2628002}
                // ], 
                    required: true},
                {name: 'reason', description: "The reason for mute", type: 3, required: false},
        ],

	run: async (interaction) => {
        const target = interaction.options.getUser("user")
        const durationText = interaction.options.getString("duration")
        const reason = interaction.options.getString("reason") ?? "No reason was given"
        const {num, letter} = splitData(durationText)
        const duration = num
        const durationType = letter
        const durations = {m: 60, h: 60 * 60, d: 60 * 60 * 24, w: 60 * 60 * 24 * 7, mon: 60 * 60 * 24 * 7 * 4.35, y: 60 * 60 * 24 * 365}

        const db = await client.database.db("KingsData").collection("Punishments") 
        const result = await db.findOne({_id: target.id, type: 'ban'});

        if (!num || !letter) {
            interaction.reply({content: 'Please provide a valid duration. **E.g. **`1m`, `1h`, `1d`, `1w`, `1m` or `1y`', ephemeral: true})
        }; if (isNaN(duration)) {
            interaction.reply({content: 'Please enter a valid number', ephemeral: true})
        }; if(!durations[durationType]){
            interaction.reply({content: 'Please provide a valid duration. **E.g. **`1m`, `1h`, `1d`, `1w`, `1m` or `1y`', ephemeral: true})
            return;
        }; if (!target) {
            interaction.reply({content: `${target} does not exist.`, ephemeral: true})
            return;
        }
        const seconds = duration * durations[durationType]
        const expires = new Date()
        expires.setSeconds(expires.getSeconds() + seconds)

        const obj = {...Punishments,
            userId: target.id,
            type: 'ban',
            reason: reason,
            expires: expires,
            staffId: interaction.user.id,
        }

        if (result) {
            interaction.reply({content: `${target} is banned already!`, ephemeral: true})
            return;
        } else {
            try{
                const member = await interaction.guild.members.fetch(target.id);
                member.ban({reason: reason, deleteMessageDays: 7})
                console.log(`${target.username} has been banned for ${duration} ${durationType}`)
                interaction.reply({content: `${target} was banned`, ephemeral: true})
                interaction.channel.send(`${target} was banned by ${interaction.user}`)
                db.insertOne(obj, (err) => {if (err) throw err})    
                
            } catch (error){
                interaction.reply({content: `${target} cannot be banned`, ephemeral: true})
                console.log(error)
            }
        }
	}
};