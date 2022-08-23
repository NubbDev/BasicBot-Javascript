const {PermissionsBitField} = require('discord.js')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord.js');
const dotenv = require('dotenv')
dotenv.config()


const fs = require('node:fs')
const AsciiTable = require('ascii-table')

let table = new AsciiTable()
table.setHeading('SlashCommands.js', 'Stats')

const Token = process.env.TOKEN
const ClientId = process.env.CLIENTID
const GuildId = process.env.GUILDID

const rest = new REST({version: '10'}).setToken(Token);

module.exports = client => {
    const commands = [];

    fs.readdirSync(`./commands/`).forEach(async dir => {
        const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'))

        for (const file of commandFiles) {
            const command = require(`../commands/${dir}/${file}`)
            commands.push({
                name: command.name,
                description: command.description,
                type: command.type,
                options: command.options ? command.options : null,
                default_permission: command.default_permission ? command.default_permission : null,
                default_member_permissions: command.default_member_permissions ? PermissionsBitField.resolve(command.default_member_permissions).toString() : null
            })
        
            if (command.name) {
                client.commands.set(command.name, command)
                table.addRow(file.split('.js')[0], '✅')
            } else {
                table.addRow(file.split('.js')[0], '⛔️')
            }
        }
    });

    console.log(table.toString());
    
    (async () => {
        try {
            await rest.put(
                Routes.applicationGuildCommands(ClientId, GuildId),
                { body: commands }
            );
        } catch (error) {
            console.log(error);
        }
    })(); 
}