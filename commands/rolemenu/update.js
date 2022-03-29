const { MessageActionRow, MessageSelectMenu } = require("discord.js");
const RoleMenus = require("../../Schema/RoleMenus");

module.exports = {
    data: "rolemenu_update",
    async execute(interaction) {
        const messid = await interaction.options.getString('message_id');
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
                return;
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
                .setCustomId(id)
                .setPlaceholder(menu.placeholder)
                .setMinValues(1)
                .setMaxValues(menu.max_selections)
                .addOptions(menu.options),
            );

            interaction.channel.messages.fetch(messid)
            .then(mess => {
                mess.edit({
                    content: menu.title,
                    components: [row]
                })
                interaction.reply({
                    content: "✅  ดำเนินการสำเร็จ!",
                    ephemeral: true
                });
            })
            .catch(error => {
                interaction.reply({
                    content: "❌  ไม่พบ Message ID",
                    ephemeral: true
                });
            })
        }).clone();
    }
};

