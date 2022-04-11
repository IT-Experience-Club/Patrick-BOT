const { MessageActionRow, MessageSelectMenu } = require("discord.js");
const RoleMenus = require("../../Schema/RoleMenus");

module.exports = {
    data: "rolemenu_sent",
    async execute(interaction) {
        const id = await interaction.options.getString('id');
        await RoleMenus.findOne({ custom_id:id },async (err,menu)=>{
            if (err) {
                console.log(err);
                return
            }

            if (!menu) {
                await interaction.reply({
                    content: "ไม่พบ ID ที่ระบุ",
                    ephemeral: true
                });
                return
            }

            if (menu.max_selections > menu.options.length) {
                await interaction.reply({
                    content: "❌  ค่าMax Selection มากกว่าที่ Optionมี!",
                    ephemeral: true
                });
                return
            }

            const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId(menu.custom_id)
                .setPlaceholder(menu.placeholder)
                .setMaxValues(menu.max_selections)
                .addOptions(menu.options),
            );
                
            await interaction.reply({
                content: "✅  ดำเนินการสำเร็จ!",
                ephemeral: true
            });

            await interaction.channel.send({
                content: menu.title,
                components: [row]
            });
        }).clone();
    }
};

