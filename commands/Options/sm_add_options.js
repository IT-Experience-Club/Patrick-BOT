var emoji = require('node-emoji')

module.exports = async (MessageActionRow, MessageSelectMenu, interaction, file, { get_array_index }) => {
    const id = interaction.options.getString("id")
    const value = interaction.options.getString("value")
    const label = interaction.options.getString("label")
    const description = interaction.options.getString("description")
    const get_emoji = interaction.options.getString("emoji")
    let tmp_emoji = {}
    if (emoji.hasEmoji(get_emoji)) {
        tmp_emoji.name = emoji.find(get_emoji).emoji
    } else {
        let custom_emoji = get_emoji.replace("<:", "").replace(">", "").split(":")
        if (custom_emoji.length == 2) {
            tmp_emoji.name = custom_emoji[0]
            tmp_emoji.id = custom_emoji[1]
        }else{
            interaction.reply("❌  ไม่พบ Emoji!")
            setTimeout(() => { interaction.deleteReply() }, 5000)
            return
        }
    }
    let new_config = file.get("config.selectmenu")
    const get_index = get_array_index(new_config, "CustomId", id)
    if (get_index == -1) {
        interaction.reply("❌  ไม่พบ ID ในระบบ!")
        setTimeout(() => { interaction.deleteReply() }, 5000)
        return
    }
    if (get_array_index(new_config[get_index].Options, "value", value) != -1) {
        interaction.reply("❌  ไม่พบ value ใน ID!")
        setTimeout(() => { interaction.deleteReply() }, 5000)
        return
    }
    const menu = new_config[get_index]
    const new_op = {
        "label": label,
        "description": description,
        "value": value,
        "emoji": tmp_emoji
    }
    menu.Roles.push({
        "value":value,
        "roles":[]
    })
    menu.Options.push(new_op)
    if(get_array_index(menu.Options, "value", "unsetting_options") != -1){
        menu.Options.splice(get_array_index(menu.Options, "value", "unsetting_options"),1)
    }
    interaction.reply("✅  ดำเนินการสำเร็จ!")
    setTimeout(() => { interaction.deleteReply() }, 5000)
    file.save()
}
