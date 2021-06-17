const { MessageEmbed } = require('discord.js');

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
      .setDescription(`Bot Latency: ${ping} \n API Latency: ${client.ws.ping}`)
      msg.edit(embed);
    });
	},
};
