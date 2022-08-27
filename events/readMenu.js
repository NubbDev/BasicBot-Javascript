const client = require('../index.js');

client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;
    const { customId, member, values, component } = interaction;
    if (customId === 'pingMenu') {
        const removed = component.options.filter(option => {return !values.includes(option.value)});
        for (const id of removed) {
            member.roles.remove(id.value);
        }
        for (const id of values) {
            member.roles.add(id);
        }
        interaction.reply({ content: 'Roles updated!', ephemeral: true });
    }
})