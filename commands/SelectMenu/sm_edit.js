module.exports = async (MessageActionRow, MessageSelectMenu, interaction, file, {
    get_array_index
}) => {
    const id = interaction.options.getString("id")
    const new_id = interaction.options.getString("new_id")
    const ph = interaction.options.getString("placeholder")
    const title = interaction.options.getString("title")
    let get_max = interaction.options.getInteger("max_selection")
    let new_config = file.get("config.selectmenu")
    const menu = new_config[get_array_index(new_config, "CustomId", id)]
    if (get_array_index(new_config, "CustomId", id) == -1) {
        interaction.reply("ID not found!").then(
            setTimeout(() => {
                interaction.deleteReply()
            }, 5000)
        )
        return
    }
    if (new_id !== null) {
        menu.CustomId = new_id
    }
    if (ph !== null) {
        menu.Placeholder = ph
    }
    if (title !== null) {
        menu.Title = title
    }
    if (get_max != null) {
        menu.max_selection = get_max
    }
    interaction.reply("Done!").then(
        setTimeout(() => {
            interaction.deleteReply()
        }, 5000)
    )
    file.save()
}
