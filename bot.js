// ยังไม่ได้จัดไฟล์ *****
const { Client, Intents, MessageActionRow, MessageSelectMenu } = require('discord.js');
const Discord = require('discord.js')
let { config } = require('./config.json');
var emoji = require('node-emoji')
const command = require("./command.json")
const dotenv = require("dotenv")
const editJsonFile = require("edit-json-file");
let file = editJsonFile(`./config.json`);
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS] });
dotenv.config()
const globalfunc = require('./functions/global_function.js')
client.once('ready', () => {
    console.log(`${client.user.username} Ready!`);
});
function get_array_index(array, type, value) {
    let index = -1
    let current_index = 0
    array.some(menu => {
        if (type != "") {
            if (menu[type] == value) {
                index = current_index
            }
        } else {
            if (menu == value) {
                index = current_index
            }
        }
        current_index += 1
    })
    return index
}

// เขียน !update เพื่อ Register Slash Commands
client.on("messageCreate", async (message) => {
    if (message.content === '!update') {
        command.forEach(async cmd => {
            await client.application?.commands.create(cmd, message.guild.id)
            console.log(`Update ${cmd.name}`)
        })
    }
});

// ตรงนี้ทำหน้าที่ ผู้ใช้กด Select Menu แล้ว
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isSelectMenu()) { return }
    let new_config = file.get("config.selectmenu")
    const menu = new_config[get_array_index(new_config, "CustomId", interaction.customId)]
    try {
        interaction.values.forEach(roler => {
            menu.Roles[get_array_index(menu.Roles, "value", roler)].roles.forEach(realr => {
                interaction.member.roles.add(realr)
            })
        })
        interaction.reply("กำลังดำเนินการ")
        setTimeout(() => {
            interaction.deleteReply()
        }, 5000)
    } catch (error) {
        let mess = await interaction.channel.send("มีบางอย่างผิดพลาด")
        setTimeout(() => {
            mess.delete()
        }, 5000)
    }
})

function checkrole(array, inter) {
    let get_prem = false
    inter.member.roles.cache.some(role => {
        array.forEach(role_id => {
            if (get_prem == true){
                return
            }
            if (role.id == role_id) {
                get_prem = true
            }
        })
    })
    return get_prem
}

// อันนี้ไว้จัดการ Select Menu ทั้ง Add กับ Update
// อนาคตอาจจะเพิ่ม Crate, Edit, Remove **** ขอเวลาสักพักเลย
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) { return }

    if (checkrole(config.selectmenu_role_perm, interaction)) {        
        if (interaction.options.getSubcommand() == "get") {
            require("./commands/sm_get.js")(MessageActionRow, MessageSelectMenu, interaction, file, globalfunc)
        }
        if (interaction.options.getSubcommand() == "sent") {
            require("./commands/sm_add.js")(MessageActionRow, MessageSelectMenu, interaction, file, globalfunc)
        }
        if (interaction.options.getSubcommand() == "update") {
            require("./commands/sm_update")(MessageActionRow, MessageSelectMenu, interaction, file, globalfunc)
        }
        if (interaction.options.getSubcommand() == "create") {
            require("./commands/SelectMenu/sm_create.js")(MessageActionRow, MessageSelectMenu, interaction, file, globalfunc)
        }
        if (interaction.options.getSubcommand() == "edit") {
            require("./commands/SelectMenu/sm_edit.js")(MessageActionRow, MessageSelectMenu, interaction, file, globalfunc)
        }
        if (interaction.options.getSubcommand() == "remove") {
            require("./commands/SelectMenu/sm_remove")(MessageActionRow, MessageSelectMenu, interaction, file, globalfunc)
        }
        if (interaction.options.getSubcommand() == "add_options") {
            require("./commands/Options/sm_add_options.js")(MessageActionRow, MessageSelectMenu, interaction, file, globalfunc)
        }
        if (interaction.options.getSubcommand() == "edit_options") {
            require("./commands/Options/sm_edit_options.js")(MessageActionRow, MessageSelectMenu, interaction, file, globalfunc)
        }
        if (interaction.options.getSubcommand() == "remove_options") {
            require("./commands/Options/sm_remove_options.js")(MessageActionRow, MessageSelectMenu, interaction, file, globalfunc)
        }
        if (interaction.options.getSubcommand() == "add_roles") {
            require("./commands/Roles/sm_add_roles.js")(MessageActionRow, MessageSelectMenu, interaction, file, globalfunc)
        }
        if (interaction.options.getSubcommand() == "remove_roles") {
            require("./commands/Roles/sm_remove_roles.js")(MessageActionRow, MessageSelectMenu, interaction, file, globalfunc)
        }
    }else{
        interaction.reply("คุณไม่สามารถใช้คำสั่งนี้ได้เพราะ คำสังพวกนี้สำหรับ Admin และ Mod เท่านั้น")
        setTimeout(() => {interaction.deleteReply()}, 5000)
    }

})

client.login(process.env.TOKEN);
