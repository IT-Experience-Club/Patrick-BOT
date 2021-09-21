module.exports = async (MessageActionRow, MessageSelectMenu, interaction, file, { get_array_index }) => {
    const id = interaction.options.getString("id")
    let new_config = file.get("config.selectmenu")
    const menu = new_config[get_array_index(new_config, "CustomId", id)]
    const message_id = interaction.options.getString("message_id")
    if (get_array_index(new_config, "CustomId", id) == -1) {
        interaction.reply("❌  ไม่พบ ID ในระบบ!")
        setTimeout(() => { interaction.deleteReply() }, 5000)
        return
    }
    if (menu.max_selection > menu.Options.length) {
        interaction.reply("❌  ค่าMax Selection มากกว่าที่ Optionมี!")
        setTimeout(()=>{interaction.deleteReply()},5000)
        return
    }
    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId(menu.CustomId)
                .setMinValues(1)
                .setMaxValues(menu.max_selection)
                .setPlaceholder(menu.Placeholder)
                .addOptions(menu.Options)
        );
        interaction.channel.messages.fetch(message_id)
            .then(mess => {
                mess.edit({ content: menu.Title, components: [row] })
                interaction.reply("✅  ดำเนินการสำเร็จ!")
                setTimeout(() => { interaction.deleteReply() }, 5000)
            })
            .catch(error => {
                interaction.reply("❌  ไม่พบ Message ID")
                setTimeout(() => { interaction.deleteReply() }, 5000)
            })
}
