const RoleMenus = require("../../Schema/RoleMenus");

module.exports = {
    data: "rolemenu_remove_options",
    async execute(interaction) {
        const id = await interaction.options.getString('id');
        const getValue = await interaction.options.getString('value');
        RoleMenus.findOne({custom_id: id},async (err,menu)=>{
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

            const getIndex = menu.options.findIndex(x => x.value === getValue);

            if (getIndex === -1) {
                await interaction.reply({
                    content: "Value Not Found.",
                    ephemeral: true,
                });
                return;
            }

            menu.options.splice(getIndex,1);
            await menu.save();
            await interaction.reply({
                content: "Options Was Delete.",
                ephemeral: true,
            });
        })
    }
}
