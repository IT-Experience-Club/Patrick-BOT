module.exports = async (MessageActionRow, MessageSelectMenu, interaction, file, {
    get_array_index
}) => {
    const get_id = interaction.options.getString("id")
    const get_value = interaction.options.getString("value")
    const get_roles = interaction.options.getString("roles").replaceAll("><", ",").replaceAll(/[^1234567890,]/g, "").split(",")
    let new_config = file.get("config.selectmenu")
    const get_index = get_array_index(new_config, "CustomId", get_id)
    if (get_index == -1) {
        interaction.reply("❌  ไม่พบ ID ในระบบ!").then(

            setTimeout(() => {
                interaction.deleteReply()
            }, 5000)
        )
        return
    }
    if (get_array_index(new_config[get_index].Roles, "value", get_value) == -1) {
        interaction.reply("❌  ไม่พบ value ใน ID!").then(

            setTimeout(() => {
                interaction.deleteReply()
            }, 5000)
        )
        return
    }
    let menu = new_config[get_index].Roles[get_array_index(new_config[get_index].Roles, "value", get_value)]
    get_roles.forEach(new_role => {
        if (menu.roles.includes(new_role)) {
            console.log("same")
            return
        } else {
            menu.roles.push(new_role)
        }
    })
    interaction.reply("✅  ดำเนินการสำเร็จ!").then(

        setTimeout(() => {
            interaction.deleteReply()
        }, 5000)
    )
    file.save()
}
