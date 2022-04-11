const chalk = require('chalk');
const { Collection } = require('discord.js');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(chalk.bgHex('#5865F2').hex('#FFFFFF').bold(" Discord ") + ` >> ${client.user.username} is Online!`);

		client.commands = new Collection();

		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		const commands = [];

		for (const file of commandFiles) {
			const command = require(`../commands/${file}`);
			commands.push(command.data.toJSON());
			client.commands.set(command.data.name, command);
		}
		
		const rest = new REST({ version: '9' }).setToken(process.env.Token);
		rest.put(Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID), {
				body: commands
			})
			.then(() => console.log(chalk.bgHex('#5865F2').hex('#FFFFFF').bold(" Discord ") + ' >> Successfully registered application commands.'))
			.catch(console.error);
	},
};
