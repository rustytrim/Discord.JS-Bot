const { prefix, owner } = require('../../config.json');

module.exports = (client, message) => {
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
}
