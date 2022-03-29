const RoleMenus = require("../../Schema/RoleMenus");

module.exports = {
    data: "rolemenu_remove_roles",
    async execute(interaction) {
        const id = await interaction.options.getString('id');
        const getvalue = await interaction.options.getString('value');
        const getroles = await interaction.options.getString('roles').replaceAll(" ", "").replaceAll("><", ",").replaceAll(/[^1234567890,]/g, "").split(",");

        RoleMenus.findOne({custom_id: id}, async (err, menu) => {
            if(err){
                console.log(err);
            }
            if (!menu) {
                await interaction.reply({
                    content: "ID Not Found.",
                    ephemeral: true,
                });
                return;
            }
            
            const getIndex = menu.options.findIndex(x => x.value === getvalue);
            if (getIndex === -1) {
                await interaction.reply({
                    content: "Value Not Found.",
                    ephemeral: true,
                });
                return;
            }

            getroles.forEach(role => {
                const getRoleIndex = menu.options[getIndex].roles.findIndex(x => x === role);
                if (getRoleIndex !== -1) {
                    menu.options[getIndex].roles.splice(getRoleIndex, 1);
                }
            });
            menu.markModified('options');
            await menu.save();
            console.log(menu.options[getIndex]);
            await interaction.reply({
                content: "Remove Roles.",
                ephemeral: true,
            });
        })
    }
}
