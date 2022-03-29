const emoji  = require("node-emoji");
const RoleMenus = require("../../Schema/RoleMenus");

module.exports = {
    data: "rolemenu_add_options",
    async execute(interaction) {
        const id = await interaction.options.getString('id');
        const getvalue = await interaction.options.getString('value');
        const getlabel = await interaction.options.getString('label');
        const getdecs = await interaction.options.getString('derscription');
        const getExe = await interaction.options.getString('execute');
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

        RoleMenus.findOne({custom_id: id},async (err,menu)=>{
            if (err) {
                console.log(err)
                return
            }

            if (!menu) {
                await interaction.reply({
                    content: "ID Not Found.",
                    ephemeral: true,
                });
                return;
            }
            let update = {
                label: getlabel,
                description: getdecs,
                value: getvalue,
                emoji: tmp_emoji,
                roles: [],
                exec: ""
            }
            
            if (getExe) {
                update.exec = getExe;
            }
            console.log(update);
            
            const getNew = menu.options.findIndex(x => x.value === 'unsetting_options')

            if (getNew !== -1) {
                menu.options[getNew] = update;
            }else{
                if (menu.options.findIndex(option => option.value == getvalue) == -1) {
                    menu.options.push(update);
                }else{
                    await interaction.reply({
                        content: "Value Already In Use.",
                        ephemeral: true,
                    });
                    return;
                }
            }
            menu.save();
            await interaction.reply({
                content: "Add New Options.",
                ephemeral: true,
            });
        });
    }
}
