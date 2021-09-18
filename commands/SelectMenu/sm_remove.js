module.exports = async (MessageActionRow, MessageSelectMenu, interaction, file, { get_array_index }) => {
    const get_id = interaction.options.getString("id")
    let new_config = file.get("config.selectmenu")
    const get_index = get_array_index(new_config, "CustomId", get_id)
    if (get_index == -1) {
        interaction.reply("ID not found!")
        setTimeout(()=>{interaction.deleteReply()},5000)
        return
    }
    new_config.splice(get_index,1)
    file.save()
    interaction.reply("Done!")
    setTimeout(()=>{interaction.deleteReply()},5000)
}
