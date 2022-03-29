const RoleMenus = require("../../Schema/RoleMenus");

module.exports = {
    data: "rolemenu_create",
    async execute(interaction) {
        const id = await interaction.options.getString('id');
        const placeholder = await interaction.options.getString('placeholder');
        const title = await interaction.options.getString('title');
        var max_selections = await interaction.options.getNumber('max_selection');
        if (max_selections == null) {
            max_selections = 1
        }

        RoleMenus.findOne({
            custom_id: id
        }, async (err, menu) => {
            if (err) {
                console.log(err);
                return
            }

            if (!menu) {
                menu = new RoleMenus({
                    "custom_id": id,
                    "placeholder": placeholder,
                    "max_selections": max_selections,
                    "options": [{
                        "label": "Unsetting Options",
                        "description": "กรุณาตั้งค่าให้ครบ",
                        "value": "unsetting_options",
                        "emoji": {
                            "name": "🔧"
                        },
                        "roles": []
                    }],
                    "title": title
                });
                await menu.save()
                await interaction.reply({
                    content: "เรียบร้อย",
                    ephemeral: true
                });
                return
            }


            await interaction.reply({
                content: "ID โดนใช้ไปแล้ว",
                ephemeral: true
            });
        }).clone();
    }
};
