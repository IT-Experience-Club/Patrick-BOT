const { MessageEmbed } = require("discord.js");
const RoleMenus = require("../../Schema/RoleMenus");

module.exports = {
    data: "rolemenu_get",
    async execute(interaction) {
        var filters = {}
        const id = await interaction.options.getString('id');
        if (id != null) {
            filters.custom_id = id
        }

        RoleMenus.find(filters,async (err,all_menu) => {
            if (err) {
                console.log(err);
                return
            }

            if (!all_menu) {
                console.log("Not Found");
                return
            }
            
            const message = new MessageEmbed()
                
            if (all_menu.length > 1) {             
                message.setTitle("List All");
                message.setDescription("Get All Rolemenu");
                all_menu.forEach((menu) => {
                    message.addField(menu.custom_id,menu.placeholder,true);
                })
            }else{
                const menu = all_menu[0]
                message.setTitle(`Info ID : ${menu.custom_id}`);
                message.addField('Placeholder',menu.placeholder,true);
                message.addField('Title',menu.title,true);
                message.addField('Max Selection',`${menu.max_selections}`);
                message.addField('Options',"🔽");
                menu.options.forEach(option => {
                    var list_roles = ""
                    option.roles.forEach(role => {
                        list_roles += `<@&${role}> `
                    })
                    if (list_roles == "") {
                        list_roles = "Not Assign Any Roles"
                    }
                    message.addField(`Value: ${option.value} | Label: ${option.label} | Description: ${option.description}`, `${list_roles}`);
                });
            }
            interaction.reply({ embeds: [message],ephemeral: true });;
        })
    }
};

