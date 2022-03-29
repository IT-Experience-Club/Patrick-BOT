const RoleMenus = require("../../Schema/RoleMenus");

module.exports = {
    data: "rolemenu_edit_menu",
    async execute(interaction) {
        const id = await interaction.options.getString('id');
        const new_id = await interaction.options.getString('new_id');
        const placeholder = await interaction.options.getString('placeholder');
        const title = await interaction.options.getString('title');
        const max_selections = await interaction.options.getNumber('max_selection');
        RoleMenus.findOne({custom_id: new_id},async (err,menu) => {
            if (err) {
                console.log(err)
            }

            if (!menu) {
                RoleMenus.findOne({custom_id: id},async (err,edit_menu) => {
                    if (!edit_menu) {
                        await interaction.reply({
                            content: "ID Not Found.",
                            ephemeral: true,
                        });
                        return;
                    }
                    var new_menu = {}
                    if (new_id) {
                        new_menu['custom_id'] = new_id
                    }
                    if (placeholder) {
                        new_menu['placeholder'] = placeholder
                    }
                    if (title) {
                        new_menu['title'] = title
                    }
                    if (max_selections) {
                        new_menu['max_selections'] = max_selections
                    }
                    Object.assign(edit_menu, new_menu);
                    edit_menu.save();
                    return;
                })
            }else{
                await interaction.reply({
                    content: "ID Already Use.",
                    ephemeral: true,
                });
                return;
            }
        });
    }
}
