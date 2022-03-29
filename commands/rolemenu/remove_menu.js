const RoleMenus = require("../../Schema/RoleMenus");

module.exports = {
    data: "rolemenu_remove_menu",
    async execute(interaction) {
        const id = await interaction.options.getString('id');
        RoleMenus.findOneAndDelete({custom_id:id},async (err,delete_menu)=>{
            if (err) {
                console.log(err);
            }

            if (!delete_menu) {
                await interaction.reply({
                    content: "ID Not Found.",
                    ephemeral: true,
                });
                return;
            }

            await interaction.reply({
                content: "Menu Was Delete.",
                ephemeral: true,
            });
            return;
        })
    }
}
