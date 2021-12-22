module.exports = async (MessageActionRow, MessageSelectMenu, interaction, file, { get_array_index }) => {
    const get_id = interaction.options.getString("id")
    const get_value = interaction.options.getString("value")
    const get_roles = interaction.options.getString("roles").replaceAll("><", ",").replaceAll(/[^1234567890,]/g, "").split(",")
    let new_config = file.get("config.selectmenu")
    const get_index = get_array_index(new_config, "CustomId", get_id)
    if (get_index == -1) {
        interaction.reply("❌  ไม่พบ ID ในระบบ!")
        setTimeout(()=>{interaction.deleteReply()},5000)
        return
    }
    let menu = new_config[get_index]
    let get_roles_id = menu.Roles[get_array_index(menu.Roles,"value",get_value)]
    if (get_array_index(menu.Roles,"value",get_value) == -1) {
        interaction.reply("❌  ไม่พบ value ใน ID!")
        setTimeout(()=>{interaction.deleteReply()},5000)
        return
    }
    get_roles.forEach(new_role => {
        if (get_roles_id.roles.includes(new_role)) {
            const cordition = (index) => index == new_role
            get_roles_id.roles.splice(get_roles_id.roles.findIndex(cordition), 1)
        } else {
            return
        }
    })
    interaction.reply("✅  ดำเนินการสำเร็จ!")
    setTimeout(()=>{interaction.deleteReply()},5000)
    file.save()
}
