const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'addrole',
	description: 'Add a role to a member!',
	async execute(client, message, args) {
	    const userArgs = message.content.split(" ").slice(1);
	    const roleArgs = message.content.split(" ").slice(2);
	    const member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]);
	    const role = message.mentions.roles.first() || message.guild.roles.cache.get(roleArgs[0]);
	    let embed;
	    
	    if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
			embed = new MessageEmbed()
			.setTitle("Insufficient permissions")
			.setColor("RED")
			.setDescription("I do not have permission to manage roles.")

			return message.channel.send(embed);
		}

		if(!message.member.hasPermission("MANAGE_ROLES")) {
			embed = new MessageEmbed()
            .setTitle("Insufficient permissions")
            .setColor('RED')
            .setDescription("You do not have permission to manage roles.")

			return message.channel.send(embed);
		}
		
		if(!member) {
		    embed = new MessageEmbed()
		    .setTitle("No member specified")
		    .setColor('RED')
		    .setDescription("Please specify a member for me to give a role to.")
		    
		    return message.channel.send(embed);
		}
		
		if(!role) {
		    embed = new MessageEmbed()
		    .setTitle("No role specified")
		    .setColor('RED')
		    .setDescription(`Please specify a role for me to give to ***${member.user.tag}***`)
		    
		    return message.channel.send(embed);
		} else {
		    try {
		        embed = new MessageEmbed()
		        .setTitle(`${member.user.tag}`)
		        .setColor('GREEN')
		        .setDescription(`***${member.user.tag}***, has obtained the role ***${role.name}***.`)
		        
		        await member.roles.add(role);
		        return message.channel.send(embed);
		    } catch(err) {
		        embed = new MessageEmbed()
		        .setTitle("An error has occured.")
		        .setColor('RED')
		        .setDescription("An error has occured. Please contact the bot owner.")
		        
		        console.log(err)
		        return message.channel.send(embed);
		    }
		}
	}
}
