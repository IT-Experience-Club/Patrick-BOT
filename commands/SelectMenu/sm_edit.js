module.exports =async (MessageActionRow,MessageSelectMenu, interaction,file, {get_array_index}) => {
        const id = interaction.options.getString("id")
        const new_id = interaction.options.getString("new_id")
        const ph = interaction.options.getString("placeholder")
        const title = interaction.options.getString("title")
        let new_config = file.get("config.selectmenu")
        const menu = new_config[get_array_index(new_config, "CustomId", id)]
        if (get_array_index(new_config, "CustomId", id) == -1) {
            interaction.reply("ID not found!")
            setTimeout(()=>{interaction.deleteReply()},5000)
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
        interaction.reply("Done!")
        setTimeout(()=>{interaction.deleteReply()},5000)
        file.save()
}
