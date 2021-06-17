const { MessageEmbed } = require('discord.js');
const { owner } = require('../../config.json');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(client, message, args) {
		let embed = new MessageEmbed()
    		.setTitle('Ping')
    		.setColor('RANDOM')
    		.setDescription("Ping is being calculated...")
    
    		message.channel.send(embed).then(msg => {
      		const ping = msg.createdTimestamp - message.createdTimestamp;
      		let embed = new MessageEmbed()
      		.setTitle('Ping')
      		.setColor('RANDOM')
      		.setDescription(`Bot Latency: ${ping}\nAPI Latency: ${client.ws.ping}`)
      		.setFooter(`Bot hosted by ${owner.tag}. Bot coded by RT#0999`)

      		msg.edit(embed);
		});
	}
};
