const fs = require('fs');

module.exports = (client) => {
    const eventFolders = fs.readdirSync('./events');
    for (const folder of eventFolders) {
        const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
        const event = require(`../events/${folder}/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        }
    }
}
