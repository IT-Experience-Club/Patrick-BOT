const { SlashCommandBuilder } = require('@discordjs/builders');
const { Collection } = require('discord.js');
const fs = require('fs');

const test = new Collection();
const testPath = fs.readdirSync('./commands/rolemenu').filter(file => file.endsWith('.js'));
for (const file of testPath) {
	const command = require(`../commands/rolemenu/${file}`);
	test.set(command.data, command);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rolemenu')
		.setDescription('Replies with Pong!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('sent')
				.setDescription('Info about the server')
				.addStringOption(option => option.setName('id').setDescription('The user').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('get')
				.setDescription('Info about the server')
				.addStringOption(option => option.setName('id').setDescription('The user')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('update')
				.setDescription('Info about the server')
				.addStringOption(option => option.setName('message_id').setDescription('The user').setRequired(true))
				.addStringOption(option => option.setName('id').setDescription('The user').setRequired(true))
				)
		.addSubcommand(subcommand =>
			subcommand
				.setName('create')
				.setDescription('Info about the server')
				.addStringOption(option => option.setName('id').setDescription('The user').setRequired(true))
				.addStringOption(option => option.setName('placeholder').setDescription('The user').setRequired(true))
				.addStringOption(option => option.setName('title').setDescription('The user').setRequired(true))
				.addNumberOption(option => option.setName('max_selection').setDescription('The user'))
				)
		.addSubcommandGroup(SubcommandGroup =>
			SubcommandGroup
				.setName('add')
				.setDescription('Info about the server')
				.addSubcommand(subcommand =>
					subcommand
						.setName('options')
						.setDescription('Info about the server')
						.addStringOption(option => option.setName('id').setDescription('The user').setRequired(true))
						.addStringOption(option => option.setName('value').setDescription('The user').setRequired(true))
						.addStringOption(option => option.setName('label').setDescription('The user').setRequired(true))
						.addStringOption(option => option.setName('derscription').setDescription('The user').setRequired(true))
						.addStringOption(option => option.setName('emoji').setDescription('The user').setRequired(true))
						.addStringOption(option => option.setName('execute').setDescription('The user'))
						)
				.addSubcommand(subcommand =>
					subcommand
						.setName('roles')
						.setDescription('Info about the server')
						.addStringOption(option => option.setName('id').setDescription('The user').setRequired(true))
						.addStringOption(option => option.setName('value').setDescription('The user').setRequired(true))
						.addStringOption(option => option.setName('roles').setDescription('The user').setRequired(true))))
		.addSubcommandGroup(SubcommandGroup =>
			SubcommandGroup
				.setName('edit')
				.setDescription('Info about the server')
				.addSubcommand(subcommand =>
					subcommand
						.setName('menu')
						.setDescription('Info about the server')
						.addStringOption(option => option.setName('id').setDescription('The user').setRequired(true))
						.addStringOption(option => option.setName('new_id').setDescription('The user'))
						.addStringOption(option => option.setName('placeholder').setDescription('The user'))
						.addStringOption(option => option.setName('title').setDescription('The user'))
						.addNumberOption(option => option.setName('max_selection').setDescription('The user')))
				.addSubcommand(subcommand =>
					subcommand
						.setName('options')
						.setDescription('Info about the server')
						.addStringOption(option => option.setName('id').setDescription('The user').setRequired(true))
						.addStringOption(option => option.setName('value').setDescription('The user').setRequired(true))
						.addStringOption(option => option.setName('new_value').setDescription('The user'))
						.addStringOption(option => option.setName('label').setDescription('The user'))
						.addStringOption(option => option.setName('derscription').setDescription('The user'))
						.addStringOption(option => option.setName('emoji').setDescription('The user'))))
		.addSubcommandGroup(SubcommandGroup =>
			SubcommandGroup
				.setName('remove')
				.setDescription('Info about the server')
				.addSubcommand(subcommand =>
					subcommand
						.setName('menu')
						.setDescription('Info about the server')
						.addStringOption(option => option.setName('id').setDescription('The user').setRequired(true))
				)
				.addSubcommand(subcommand =>
					subcommand
						.setName('options')
						.setDescription('Info about the server')
						.addStringOption(option => option.setName('id').setDescription('The user').setRequired(true))
						.addStringOption(option => option.setName('value').setDescription('The user').setRequired(true))
				)
				.addSubcommand(subcommand =>
					subcommand
						.setName('roles')
						.setDescription('Info about the server')
						.addStringOption(option => option.setName('id').setDescription('The user').setRequired(true))
						.addStringOption(option => option.setName('value').setDescription('The user').setRequired(true))
						.addStringOption(option => option.setName('roles').setDescription('The user').setRequired(true))
						)),

	async execute(interaction) {
		var command_name = interaction.commandName
		if (interaction.options._group != null) {
			command_name = command_name + "_" + interaction.options._group
		}
		if (interaction.options._subcommand != null) {
			command_name = command_name + "_" + interaction.options._subcommand
		}
		const command = test.get(command_name);
		if (!command) return
		try {
			await command.execute(interaction);
		} catch (err) {
			if (err) console.error(err);
			await interaction.reply({
				content: "An error occurred while executing that command.",
				ephemeral: true,
			});
		}
	},
};
