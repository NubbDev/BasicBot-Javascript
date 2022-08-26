const { Client, GatewayIntentBits, Collection, Partials } = require("discord.js");
const dotenv = require('dotenv');
const {DisTube} = require('distube')
const {SpotifyPlugin} = require('@distube/spotify')
const MongoClient = require('mongodb').MongoClient 
dotenv.config();


const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent],
    partials: [Partials.GuildMember, Partials.Channel, Partials.ThreadMember, Partials.GuildScheduledEvent, Partials.Message, Partials.User]
});
client.music = new DisTube(client, {
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin]
})

// Levels.setURL(process.env.MONGO_URI);

client.database = new MongoClient(process.env.MONGO_URL);
client.commands = new Collection();
client.aliases = new Collection();
client.voiceGenerator = new Collection();



module.exports = client;

// All Events and Commands Are Loading

['commands', 'events'].forEach(dir => {
    require(`./handlers/${dir}`)(client)
})

// Launch the whole bot!
client.login(process.env.TOKEN);
client.database.connect((err, db) => {
    if (err) throw err;
    console.log("Database Connected")
})