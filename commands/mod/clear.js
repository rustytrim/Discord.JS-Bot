const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'clear',
	description: "Clear chat messages",
	async execute(client, message, args) {
	    const channelArgs = message.content.split(" ").slice(2);
	    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(channelArgs[0]);
	    const amount = args[0];
	    let embed;
	    
	    if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
			embed = new MessageEmbed()
			.setTitle("Insufficient permissions")
			.setColor("RED")
			.setDescription("I do not have permission to manage messages.")

			return message.channel.send(embed);
		}

		if(!message.member.hasPermission("MANAGE_ROLES")) {
			embed = new MessageEmbed()
            .setTitle("Insufficient permissions")
            .setColor('RED')
            .setDescription("You do not have permission to manage messages.")

			return message.channel.send(embed);
		}
	    
	    if(!amount) {
	        embed = new MessageEmbed()
	        .setTitle("An error has occurred.")
	        .setColor('RED')
	        .setDescription("Please specify an amount of messages to clear.")
	        
	        return message.channel.send(embed);
	    }
	    
	    if(isNaN(amount)) {
	        embed = new MessageEmbed()
	        .setTitle("An error has occured.")
	        .setColor('RED')
	        .setDescription(`***${amount}*** is not a number. Please specify a number.`)
	        
	        return message.channel.send(embed);
	    }
	    
	    if(amount.startsWith('-')) {
	        embed = new MessageEmbed()
	        .setTitle("An error has occured.")
	        .setColor('RED')
	        .setDescription("You cannot clear a negative amount of messages.")
	        
	        return message.channel.send(embed);
	    }
	    
	    if(!channel) {
	        try {
	            channel = message.channel;
	            embed = new MessageEmbed()
	            .setTitle("Purged!")
	            .setColor('YELLOW')
	            .setDescription(`Successfully cleared ***${amount}*** messages in ***${channel.name}***`)
	            
	            await channel.bulkDelete(parseInt(amount) + 1)
	            
	            return message.channel.send(embed)
	        } catch(err) {
	            embed = new MessageEmbed()
	            .setTitle("An error has occured")
	            .setColor('RED')
	            .setDescription("Please contact the bot owner.")
	        
	            console.log(err);
	            return message.channel.send(embed);
	        }
	    }
	    
	    try {
	        embed = new MessageEmbed()
	        .setTitle("Purged!")
	        .setColor('YELLOW')
	        .setDescription(`Successfully cleared ***${amount}*** messages in ***${channel.name}***`)
	        
	        await channel.bulkDelete(parseInt(amount))
	        
	        return message.channel.send(embed);
	    } catch(err) {
	        embed = new MessageEmbed()
	        .setTitle("An error has occured")
	        .setColor('RED')
	        .setDescription("Please contact the bot owner.")
	        
	        console.log(err);
	        return message.channel.send(embed);
	    }
	}
}
