module.exports = async (MessageActionRow, MessageSelectMenu, interaction, file, { get_array_index }) => {
    const id = interaction.options.getString("id")
    const ph = interaction.options.getString("placeholder")
    const title = interaction.options.getString("title")
    let new_config = file.get("config.selectmenu")
    const get_index = get_array_index(new_config, "CustomId", id)
    if (get_index != -1) {
        interaction.reply("ID Already Use!")
        setTimeout(()=>{interaction.deleteReply()},5000)
        return
    }
    file.append("config.selectmenu", {
        "CustomId": id,
        "Placeholder": ph,
        "Options": [
            {
                "label": "Unsetting Options",
                "description": "กรุณาตั้งค่าให้ครบ",
                "value": "unsetting_options",
                "emoji": {
                    "name": "🔧"
                }
            }
        ],
        "Roles": [
        ],
        "Title": title
    })
    interaction.reply("ID Create!")
    setTimeout(()=>{interaction.deleteReply()},5000)
    file.save()
}
