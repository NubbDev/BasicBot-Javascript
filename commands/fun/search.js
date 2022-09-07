const {ApplicationCommandType, EmbedBuilder} = require("discord.js");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const filterWithLimit = (arr, value, length) =>
  Array.from({ length }, function () {
    return arr
        .slice(this.index++)
        .find((option, i) => (this.index += i, option.includes(value)));
    }, { index: 0 }
);

module.exports = {
  name: "search",
  description: "Search for a one of BasicKing's Videos",
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: "name",
      description: "Youtube Video Title",
      type: 3,
      autocomplete: true,
      required: true,
    },
  ],
  autocomplete: async (interaction) => {
    let inputOptions = [];
    try{
    const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC0UetqANVOipDeOLx08dffg&maxResults=99999999&order=date&type=video&key=${process.env.YOUTUBEAPI}`)
    const data = await res.json()
    for await (const video of data.items) {
      inputOptions.push({
        name: video.snippet.title,
        value: video.id.videoId,
      });
    }
    const input = interaction.options.getString("name");
    let nameList = [];
    for (const option of inputOptions) {
        nameList.push(option.name);
    }
    let filtered = [];
    let nameFiltered = [];
    if (nameList.length > 25) {
        filtered = filterWithLimit(nameList, input, 25);
        for (const option of filtered) {
            if (option === undefined) {
                nameFiltered = filtered.filter((option) => option !== undefined);
            }
        }
    }
    interaction.respond(
        nameFiltered.map(choice => ({name: choice, value: choice}))
    )
    } catch(err) {
        console.log(err)
    }},
  run: async interaction => {
    const name = interaction.options.getString("name");
    const nameUrl = name.replace(/ /g, "%20");

    try{
        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC0UetqANVOipDeOLx08dffg&maxResults=1&order=relevance&q=${nameUrl}&key=${process.env.YOUTUBEAPI}`) 
        const data = await res.json()
        console.log(data)
    } catch (err) {
      console.log(err);
    }
  },
};
