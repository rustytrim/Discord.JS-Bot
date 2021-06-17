const DiscordJS = require('discord.js');
const { token } = require('./config.json');

const client = new DiscordJS.Client();

client.on("ready", () => {
  console.log(`${client.user.tag}, is online!`);
});

client.login(token);
