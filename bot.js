const dotenv = require("dotenv");
const fs = require('fs');
const {Client, Intents} = require('discord.js');

const Database = require("./config/Database");

const db = new Database();

db.connect();


const client = new Client({intents : [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS]});
dotenv.config()

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
        const event = require(`./events/${file}`);
	if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
	} else {
                client.on(event.name, (...args) => event.execute(...args));
	}
}


client.login(process.env.Token);
