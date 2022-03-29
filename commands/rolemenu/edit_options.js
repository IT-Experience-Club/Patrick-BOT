const emoji  = require("node-emoji");
const RoleMenus = require("../../Schema/RoleMenus");

module.exports = {
    data: "rolemenu_edit_options",
    async execute(interaction) {
        const id = await interaction.options.getString('id');
        const getvalue = await interaction.options.getString('value');
        const getnewvalue = await interaction.options.getString('new_value');
        const getlabel = await interaction.options.getString('label');
        const getdecs = await interaction.options.getString('derscription');
        let getemoji = await interaction.options.getString('emoji');

        tmp_emoji = {}
        let custom_emoji = getemoji.replace("<:","").replace(">","").split(":")
        if (emoji.hasEmoji(getemoji)) {
            tmp_emoji.name = emoji.get(getemoji);
        }else if (await interaction.client.emojis.cache.get(custom_emoji[1]) != undefined) {
            tmp_emoji.name = custom_emoji[0];
            tmp_emoji.id = custom_emoji[1]
        }else{
            await interaction.reply({
                content: "Emoji Not Found.",
                ephemeral: true,
            });
        }
        console.log(tmp_emoji)
        RoleMenus.findOne({custom_id: id},async (err, menu)=>{
            if (err) {
                console.log(err);
            }

            if (!menu) {
                await interaction.reply({
                    content: "ID Not Found.",
                    ephemeral: true,
                });
                return;
            }

            if (menu.options.findIndex(option => option.value == getnewvalue) != -1) {
                await interaction.reply({
                    content: "Value Already Use.",
                    ephemeral: true,
                });
                return;
            }
            if (menu.options.findIndex(option => option.value == getvalue) == -1) {
                await interaction.reply({
                    content: "Value Not Found.",
                    ephemeral: true,
                });
                return;
            }

            const getIndex = menu.options.findIndex(option => option.value == getvalue);
            var edit_options = {}
            if (getnewvalue) {
                edit_options.value = getnewvalue
            }
            if (getlabel) {
                edit_options.label = getlabel
            }
            if (getdecs) {
                edit_options.description = getdecs
            }
            if (getemoji != null && tmp_emoji != {}) {
                menu.options[getIndex].emoji = tmp_emoji
            }
            Object.assign(menu.options[getIndex],edit_options);
            menu.markModified('options');
            menu.save()
            await interaction.reply({
                content: "Edit New Options.",
                ephemeral: true,
            });
        })
    }
}
