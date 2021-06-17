const DiscordJS = require('discord.js');
const fs = require('fs');
const { token, prefix, owner } = require('./config.json');

const client = new DiscordJS.Client();

client.commands = new DiscordJS.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const cmd = require(`./commands/${folder}/${file}`);
        client.commands.set(cmd.name, cmd);
    }
}

client.on('ready', () => {
  console.log(`${client.user.tag}, is online!`);
});

client.on('message', (message) => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  if(!client.commands.has(cmd)) return;
  try {
		client.commands.get(cmd).execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply(`An error has occured. Please contact ${owner.tag} for assistance.`);
	}
})

client.login(token);
