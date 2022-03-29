const RoleMenus = require("../../Schema/RoleMenus");

module.exports = {
    data: "rolemenu_add_roles",
    async execute(interaction) {
        const id = await interaction.options.getString('id');
        const getvalue = await interaction.options.getString('value');
        const getroles = await interaction.options.getString('roles').replaceAll(" ", "").replaceAll("><", ",").replaceAll(/[^1234567890,]/g, "").split(",");
        RoleMenus.findOne({custom_id:id},async (err,menu) => {
            if (err) {
                console.log(err);
            };

            if (!menu) {
                interaction.reply({
                    content: "ID Not Found.",
                    ephemeral: true,
                });
            }
            const getIndex = menu.options.findIndex(option => option.value == getvalue)
            if (getIndex == -1) {
                interaction.reply({
                    content: "Value Not Found.",
                    ephemeral: true,
                });
            }
            
            await getroles.forEach(role => {
                if (menu.options[getIndex].roles.includes(role) == false) {
                    menu.options[getIndex].roles.push(role);
                }
            });
            menu.markModified('options');
            await menu.save();
            await interaction.reply({
                content: "Add New Roles.",
                ephemeral: true,
            });
        });
    }
}
