module.exports = async (MessageActionRow, MessageSelectMenu, interaction, file, { get_array_index }) => {
    const get_id = interaction.options.getString("id")
    const get_value = interaction.options.getString("value")
    let new_config = file.get("config.selectmenu")
    const get_index = get_array_index(new_config, "CustomId", get_id)
    if (get_index == -1) {
        interaction.reply("❌  ไม่พบ ID ในระบบ!")
        setTimeout(() => { interaction.deleteReply() }, 5000)
        return
    }
    let menu = new_config[get_index]
    const get_op_index = get_array_index(menu.Options, "value", get_value)
    menu.Options.splice(get_op_index,1)
    menu.Roles.splice(get_array_index(menu.Roles, "value", get_value),1)
    interaction.reply("✅  ดำเนินการสำเร็จ!")
    setTimeout(() => { interaction.deleteReply() }, 5000)
    file.save()
}
