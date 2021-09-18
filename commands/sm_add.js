module.exports =async (MessageActionRow,MessageSelectMenu, interaction,file, {get_array_index}) => {
    const id = interaction.options.getString("id")
    let new_config = file.get("config.selectmenu")
    const menu = new_config[get_array_index(new_config, "CustomId", id)]
    if (get_array_index(new_config, "CustomId", id) == -1) {
        interaction.reply(" ❌ ไม่พบ ID ในระบบ!")
        setTimeout(()=>{interaction.deleteReply()},5000)
        return
    }
    const row = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
        .setCustomId(menu.CustomId)
        .setPlaceholder(menu.Placeholder)
        .addOptions(menu.Options),
        );
    interaction.reply("✅  ดำเนินการสำเร็จ!")
    setTimeout(()=>{interaction.deleteReply()},5000)
    await interaction.channel.send({ content: menu.Title, components: [row] });
}
