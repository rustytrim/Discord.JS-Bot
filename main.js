const DiscordJS = require('discord.js');
const fs = require('fs');
const { token, prefix, owner } = require('./config.json');

const client = new DiscordJS.Client();
client.commands = new DiscordJS.Collection();

require('./utils/commandHandler.js')(client)
require('./utils/eventHandler.js')(client)

client.login(token);
