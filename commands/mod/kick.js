const { MessageEmbed } = require('discord.js');
const { owner } = require('../../config.json');

module.exports = {
	name: 'kick',
	description: 'Kick a member!',
	async execute(client, message, args) {
		let embed;
		const userArgs = message.content.split(" ").slice(1);
                const member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]);
                let reason = args.slice(member).join(" ");

		if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
			embed = new MessageEmbed()
			.setTitle("Insufficient permissions")
			.setColor("RED")
			.setDescription("I do not have permission to kick people.")

			return message.channel.send(embed);
		}

		if(!message.member.hasPermission("KICK_MEMBERS")) {
			embed = new MessageEmbed()
                        .setTitle("Insufficient permissions")
                        .setColor('RED')
                        .setDescription("You do not have permission to kick people.")

			return message.channel.send(embed);
		}

		if(!member) {
			embed = new MessageEmbed()
			.setTitle("Not enough arguments.")
			.setColor('RED')
			.setDescription("Please specify who you want to kick.")

			return message.channel.send(embed);
		} else {
			try {
				if(!reason) reason = "No reason specified";
				embed = new MessageEmbed()
				.setTitle(`KICKED ${member.user.tag}`)
                        	.setColor('BLUE')
                        	.setDescription(`***${member.user.tag}***, has been kicked for:\n***${reason}***`)

				await member.kick({reason: reason});
				return message.channel.send(embed);
			} catch(err) {
				embed = new MessageEmbed()
				.setTitle("An error has occured.")
				.setColor('RED')
				.setDescription(`An error has occured. Please make sure the bots role is above ***${member.user.tag}***'s role. If that still doesen't fix the issue. Please contact ***${owner.tag}***.`)

				console.log(err);
				return message.channel.send(embed);
			}
		}
	},
}
