const GuildSetting = require("../Schema/GuildSetting");

module.exports = {
	name: 'guildCreate',
	execute(guild) {
        GuildSetting.findOne({ guild_id: guild.id }, (err, settings) => {
			if (err) {
				console.log(err);
				// interaction.reply("An error occurred while trying to set the welcome channel!");
				return;
			}

			if (!settings) {
				settings = new GuildSetting({
					guild_id: guild.id,
				});
			} else {
			}

			settings.save(err => {
				if (err) {
					console.log(err);
					// interaction.reply("An error occurred while trying to set the welcome channel!");
					return;
				}

				console.log(`Welcome channel jas been set to `);
			})
		})
    }
};
