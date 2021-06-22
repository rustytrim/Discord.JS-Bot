const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'nickname',
    description: 'Give a member a nickname!',
    async execute(client, message, args) {
        const userArgs = message.content.split(" ").slice(1);
        const nick = message.content.split(" ").slice(2).join(" ");
        const member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]);
        let embed;

        if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) {
            embed = new MessageEmbed()
                .setTitle("Insufficient permissions")
                .setColor("RED")
                .setDescription("I do not have permission to manage nicknames")

            return message.channel.send(embed);
        }

        if (!message.member.hasPermission("MANAGE_NICKNAMES")) {
            embed = new MessageEmbed()
                .setTitle("Insufficient permissions")
                .setColor('RED')
                .setDescription("You do not have permission to manage nicknames")

            return message.channel.send(embed);
        }

        if (!member) {
            embed = new MessageEmbed()
                .setTitle("No member specified")
                .setColor('RED')
                .setDescription("Please specify a member for me to nickname")

            return message.channel.send(embed);
        }

        if (member.id == message.guild.ownerID) {
            embed = new MessageEmbed()
                .setTitle("ERROR")
                .setColor('RED')
                .setDescription(`I cannot nickname server owners.`)

            return message.channel.send(embed);
        }

        if (!nick) {
            embed = new MessageEmbed()
                .setTitle("No nickname specified")
                .setColor('RED')
                .setDescription(`Please specify a nickname for  ***${member.user.tag}***`)

            return message.channel.send(embed);
        }

        try {
            embed = new MessageEmbed()
                .setTitle(`${member.user.tag}`)
                .setColor('GREEN')
                .setDescription(`***${member.user.tag}***, has been nicknamed to ***${nick}***.`)

            await member.setNickname(nick);
            return message.channel.send(embed);
        } catch (err) {
            embed = new MessageEmbed()
                .setTitle("An error has occured.")
                .setColor('RED')
                .setDescription(`An error has occured. Please contact the bot owner for assistance.`)
            console.log(err);
            return message.channel.send(embed);
        }
    }
}
