const { Collection } = require('discord.js');
const fs = require('fs');
const RoleMenus = require("../Schema/RoleMenus");

const test = new Collection();
const testPath = fs.readdirSync('./commands/rolemenu/special_execute').filter(file => file.endsWith('.js'));
for (const file of testPath) {
	const command = require(`../commands/rolemenu/special_execute/${file}`);
	test.set(command.data, command);
}

module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
		if (!interaction.isSelectMenu()) return;
        // console.log(interaction);
		RoleMenus.findOne({custom_id: interaction.customId},async (err,menu) => {
			interaction.values.forEach(async (value) => {
				const getIndex = menu.options.findIndex(option => option.value == value);
				getOptions = menu.options[getIndex];
				const command = test.get(getOptions.exec);
				if (command) {
					try {
						await command.execute(interaction);
					} catch (err) {
						if (err) console.error(err);
						await interaction.reply({
							content: "An error occurred while executing that command.",
							ephemeral: true,
						});
					}
				}else{
					getOptions.roles.forEach(async (role) => {
						try {
							await interaction.reply({
								content: "ดำเนินการเสร็จเรียบร้อย",
								ephemeral: true,
							});
							await interaction.member.roles.add(role)
						} catch (error) {
							
						}
					});
				}
			});
		})
    }
}
