var emoji = require('node-emoji')

module.exports = async (MessageActionRow, MessageSelectMenu, interaction, file, { get_array_index }) => {
    const get_id = interaction.options.getString("id")
    const get_value = interaction.options.getString("value")
    const get_new_value = interaction.options.getString("new_value")
    const get_label = interaction.options.getString("label")
    const get_description = interaction.options.getString("description")
    const get_emoji = interaction.options.getString("emoji")
    let tmp_emoji = {}
    let new_config = file.get("config.selectmenu")
    const get_index = get_array_index(new_config, "CustomId", get_id)
    if (get_index == -1) {
        interaction.reply("❌  ไม่พบ ID ในระบบ!")
        setTimeout(() => { interaction.deleteReply() }, 5000)
        return
    }
    if (get_array_index(new_config[get_index].Options, "value", get_value) == -1) {
        interaction.reply("❌  value ใน ID!")
        setTimeout(() => { interaction.deleteReply() }, 5000)
        return
    }
    const menu = new_config[get_index].Options[get_array_index(new_config[get_index].Options, "value", get_value)]
    if (get_label != null) {
        menu.label = get_label
    }
    if (get_description != null) {
        menu.description = get_description
    }
    if (get_new_value != null) {
        const new_roles = new_config[get_index].Roles[get_array_index(new_config[get_index].Roles, "value",get_value)]
        menu.value = get_new_value
        new_roles.value = get_new_value
    }
    if (get_emoji != null) {
        if (emoji.hasEmoji(get_emoji)) {
            tmp_emoji.name = get_emoji
        } else {
            let custom_emoji = get_emoji.replace("<:", "").replace(">", "").split(":")
            tmp_emoji.name = custom_emoji[0]
            tmp_emoji.id = custom_emoji[1]
        }
        menu.emoji = get_emoji
    }
    interaction.reply("✅  ดำเนินการสำเร็จ!")
    setTimeout(() => { interaction.deleteReply() }, 5000)
    file.save()
}

