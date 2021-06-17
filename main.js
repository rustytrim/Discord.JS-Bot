const DiscordJS = require('discord.js');
const { token } = require('./config.json');

const client = new DiscordJS.Client();
client.commands = new DiscordJS.Collection();

require('./utils/commandHandler.js')(client)
require('./utils/eventHandler.js')(client)

client.login(token);
