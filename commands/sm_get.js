module.exports = async (MessageActionRow, MessageSelectMenu, interaction, file, { get_array_index }) => {
    let new_config = file.get("config.selectmenu")
        const id = interaction.options.getString("id")
        const menu = new_config[get_array_index(new_config, "CustomId", id)]
        let str_Options = ""
        let index_Options = 1
        let str_role = ""
        if (get_array_index(new_config, "CustomId", id) == -1) {
            interaction.reply(" ❌ ไม่พบ ID ในระบบ!")
            setTimeout(() => { interaction.deleteReply() }, 5000)
            return
        }
        menu.Options.forEach(opt => {
            get_emoji = ""
            if (opt.emoji.id != undefined) {
                get_emoji = `<:${opt.emoji.name}:${opt.emoji.id}>`
            }else{
                get_emoji = opt.emoji.name
            }
            str_Options += `${index_Options}. ${opt.value} | Label : ${opt.label} | Emoji : ${get_emoji}\n`
            index_Options++
        })
        menu.Roles.forEach(get_role => {
            let str_value = ""
            get_role.roles.forEach(role => {
                str_value += `<@&${role}> `
            })
            str_role += `${get_role.value} : ${str_value}\n`
        })
        let embed = {
            "type": "rich",
            "title": `Setting`,
            "description": "",
            "color": 0x00FFFF,
            "fields": [
                {
                    "name": `ID`,
                    "value": `${menu.CustomId}`,
                    "inline": true
                },
                {
                    "name": `Placeholder`,
                    "value": `${menu.Placeholder}`,
                    "inline": true
                },
                {
                    "name": `Title`,
                    "value": `${menu.Title}`,
                    "inline": true
                },
                {
                    "name": `Max Selection`,
                    "value": `${menu.max_selection}`,
                    "inline": true
                },
                {
                    "name": `Options`,
                    "value": `${str_Options}`
                },
                {
                    "name": `Roles`,
                    "value": `${str_role}`
                }
            ]

        }
        interaction.reply({ embeds: [embed] })
}
