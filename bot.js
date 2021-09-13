// ยังไม่ได้จัดไฟล์ *****
const { Client, Intents, MessageActionRow, MessageSelectMenu } = require('discord.js');
const {config } = require('./config.json');
const command = require("./command.json")
const dotenv = require("dotenv")
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
dotenv.config()

client.once('ready', () => {
    console.log(`${client.user.username} Ready!`);
});

// เขียน !update เพื่อ Register Slash Commands
client.on("messageCreate", async (message) => {
    if (message.content === '!update') {
        command.forEach(async cmd => {
            await client.application?.commands.create(cmd, message.guild.id)
            console.log(`Update ${cmd.name}`)
        })
    }
});

// หา Role จาก ID
function getRoleID_from_Name(discord, get_role) {
    return discord.guild.roles.cache.find(role => role.name === get_role);
}

// หา Select menu จาก Json File
function seach_id(Custom_ID) {
    return config.selectmenu.find(async cmd => { await cmd.CustomId == Custom_ID })
}

// ตรงนี้ทำหน้าที่ ผู้ใช้กด Select Menu แล้ว
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isSelectMenu()) { return }
    const menu = seach_id(interaction.customId)
    if (interaction.customId == menu.CustomId) {
        try {
            interaction.values.forEach(role => {
                menu.Roles[role].forEach(role_name => {
                    interaction.member.roles.add(getRoleID_from_Name(interaction, role_name))
                })
                interaction.reply("กำลังดำเนินการ")
                setTimeout(() => {
                    interaction.deleteReply()
                }, 5000)
            })
        } catch (error) {
            let mess = await interaction.channel.send("มีบางอย่างผิดพลาด")
            setTimeout(() => {
                mess.delete()
            }, 5000)
        }
    }
})

// อันนี้ไว้จัดการ Select Menu ทั้ง Add กับ Update
// อนาคตอาจจะเพิ่ม Crate, Edit, Remove **** ขอเวลาสักพักเลย
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) { return }
    if (interaction.options.getSubcommand() == "add") {
        interaction.reply("กำลังเตรียมตัว")
        const id = interaction.options.getString("id")
        const menu = seach_id(id)
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId(menu.CustomId)
                    .setPlaceholder(menu.Placeholder)
                    .addOptions(menu.Options),
            );
        interaction.deleteReply()
        await interaction.channel.send({ content: menu.Title, components: [row] });
    }
    if (interaction.options.getSubcommand() == "update") {
        try {
            const message_id = interaction.options.getString("message_id")
            const id = interaction.options.getString("id")
            const menu = seach_id(id)
            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId(menu.CustomId)
                        .setPlaceholder(menu.Placeholder)
                        .addOptions(menu.Options),
                );
            interaction.channel.messages.fetch(message_id)
                .then(mess => mess.edit({ content: menu.Title, components: [row] }))
            interaction.reply("ดำเนินการสำเร็จ")
            setTimeout(() => { interaction.deleteReply() }, 5000)
        } catch (error) {
            interaction.reply("มีบางอย่างผิดปกติ")
            setTimeout(() => { interaction.deleteReply() }, 5000)
        }
    }
})

client.login(process.env.TOKEN);
