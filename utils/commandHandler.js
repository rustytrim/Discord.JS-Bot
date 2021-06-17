const fs = require('fs');

module.exports = (client) => {
    const commandFolders = fs.readdirSync('./commands');
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
        const cmd = require(`../commands/${folder}/${file}`);
        
        client.commands.set(cmd.name, cmd);
        }
    }
}
