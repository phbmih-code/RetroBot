require("dotenv").config();
const express = require("express");
const app = express();

const {
    Client,
    GatewayIntentBits,
    Collection,
    Events,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const fs = require("fs");
const path = require("path");
const usersFile = path.join(__dirname, "data", "users.json");
const boxFile = path.join(__dirname, "games", "box.json");

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ],
});


client.commands = new Collection();


const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));


for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.data.name, command);
}


client.once(Events.ClientReady, () => {
    console.log(`✅ Bot đã đăng nhập: ${client.user.tag}`);
});



client.on(Events.InteractionCreate, async interaction => {


    // =====================
    // SLASH COMMAND
    // =====================



        if (interaction.isChatInputCommand()) {

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {

        await command.execute(interaction);

    } catch (error) {

        console.error(error);

        if (!interaction.replied && !interaction.deferred) {

            await interaction.reply({
                content: "❌ Có lỗi khi chạy lệnh!",
                ephemeral: true
            }).catch(() => {});

        }

    }

    return;
}


 if (interaction.isButton()) {

    // =====================
    // MỞ BOX
    // =====================

    if (interaction.customId.startsWith("box_")) {
        const id = interaction.user.id;

if (!fs.existsSync(boxFile)) {
    fs.writeFileSync(boxFile, "{}");
}

let boxData = JSON.parse(fs.readFileSync(boxFile, "utf8"));

const now = Date.now();
const cooldown = 3 * 24 * 60 * 60 * 1000;

if (boxData[id] && now - boxData[id] < cooldown) {

    const remain = cooldown - (now - boxData[id]);

    const days = Math.ceil(remain / (24 * 60 * 60 * 1000));

    return interaction.reply({
        content: `⏰ Bạn đã mở hộp rồi!\n\nCó thể mở lại sau **${days} ngày**.`,
        ephemeral: true
    });

}

await interaction.reply({
    content:
`📦 Đang mở hộp...

🥁`,
    ephemeral: true
});

await delay(800);

await interaction.editReply({
    content:
`📦 Đang mở hộp...

🥁
🥁🥁`
});

await delay(800);

await interaction.editReply({
    content:
`📦 Đang mở hộp...

🥁
🥁🥁
🥁🥁🥁`
});

await delay(800);

let users = {};

if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile, "utf8"));
}

if (!users[id]) users[id] = { coins: 0 };

const reward = Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;

users[id].coins += reward;

fs.writeFileSync(usersFile, JSON.stringify(users, null, 4));

boxData[id] = now;

fs.writeFileSync(boxFile, JSON.stringify(boxData, null, 4));

const names = {
    box_1: "Thứ Nhất",
    box_2: "Thứ Hai",
    box_3: "Thứ Ba",
    box_4: "Thứ Tư",
    box_5: "Thứ Năm",
    box_6: "Thứ Sáu"
};

const boxName = names[interaction.customId];

await interaction.editReply({

    content:
`🎉 **MỞ HỘP THÀNH CÔNG!**

🎁 Bạn đã mở:
📦 Hộp may mắn ${boxName}

💰 Nhận được:
**${reward.toLocaleString()} xu**

💳 Số dư hiện tại:
**${users[id].coins.toLocaleString()} xu**

━━━━━━━━━━━━━━━━━━━━━━━
⏰ **Quay lại sau 3 ngày để mở tiếp nhé!** 🌟`

});

return;

}
    // =====================
    // MUA HOÀNG TỬ
    // =====================

    if (interaction.customId === "buy_prince") {

        const row = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()
                    .setCustomId("confirm_prince")
                    .setLabel("✅ Xác nhận")
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId("cancel_buy")
                    .setLabel("❌ Hủy")
                    .setStyle(ButtonStyle.Danger)

            );

        await interaction.reply({

            content:
`🛒 **XÁC NHẬN MUA ROLE**

🤴 **HOÀNG TỬ**

💰 Giá: **500.000 Xu**

Bạn có chắc muốn mua role này không?`,

            components: [row],
            ephemeral: true

        });

        return;
    }

    // =====================
    // MUA CÔNG CHÚA
    // =====================

    if (interaction.customId === "buy_princess") {

        const row = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()
                    .setCustomId("confirm_princess")
                    .setLabel("✅ Xác nhận")
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId("cancel_buy")
                    .setLabel("❌ Hủy")
                    .setStyle(ButtonStyle.Danger)

            );

        await interaction.reply({

            content:
`🛒 **XÁC NHẬN MUA ROLE**

👸 **CÔNG CHÚA**

💰 Giá: **500.000 Xu**

Bạn có chắc muốn mua role này không?`,

            components: [row],
            ephemeral: true

        });

        return;
    }

    // =====================
    // MUA QUẬN CHÚA
    // =====================

    if (interaction.customId === "buy_duke") {

        const row = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()
                    .setCustomId("confirm_duke")
                    .setLabel("✅ Xác nhận")
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId("cancel_buy")
                    .setLabel("❌ Hủy")
                    .setStyle(ButtonStyle.Danger)

            );

        await interaction.reply({

            content:
`🛒 **XÁC NHẬN MUA ROLE**

👑 **QUẬN CHÚA**

💰 Giá: **1.000.000 Xu**

Bạn có chắc muốn mua role này không?`,

            components: [row],
            ephemeral: true

        });

        return;
    }
        // =====================
    // XÁC NHẬN HOÀNG TỬ
    // =====================

    if (interaction.customId === "confirm_prince") {

        const file = path.join(__dirname, "data", "users.json");

        let users = {};

        if (fs.existsSync(file)) {
            users = JSON.parse(fs.readFileSync(file, "utf8"));
        }

        const id = interaction.user.id;
   

        if (!users[id]) users[id] = { coins: 0 };

        if (users[id].coins < 500000) {
            return interaction.update({
                content: "❌ Bạn không đủ **500.000 Xu** để mua **Hoàng Tử**!",
                components: []
            });
        }

        const role = interaction.guild.roles.cache.get("1529436480215449672");

        if (!role) {
            return interaction.update({
                content: "❌ Không tìm thấy role Hoàng Tử!",
                components: []
            });
        }

        users[id].coins -= 500000;

        fs.writeFileSync(file, JSON.stringify(users, null, 4));

        await interaction.member.roles.add(role);

        return interaction.update({
            content:
`🎉 **MUA THÀNH CÔNG**

🤴 Bạn đã nhận được role **Hoàng Tử**

💰 Đã trừ **500.000 Xu**`,
            components: []
        });

    }

    // =====================
    // XÁC NHẬN CÔNG CHÚA
    // =====================

    if (interaction.customId === "confirm_princess") {

        const file = path.join(__dirname, "data", "users.json");

        let users = {};

        if (fs.existsSync(file)) {
            users = JSON.parse(fs.readFileSync(file, "utf8"));
        }

        const id = interaction.user.id;

        if (!users[id]) users[id] = { coins: 0 };

        if (users[id].coins < 500000) {
            return interaction.update({
                content: "❌ Bạn không đủ **500.000 Xu** để mua **Công Chúa**!",
                components: []
            });
        }

        const role = interaction.guild.roles.cache.get("1530136699152236674");

        if (!role) {
            return interaction.update({
                content: "❌ Không tìm thấy role Công Chúa!",
                components: []
            });
        }

        users[id].coins -= 500000;

        fs.writeFileSync(file, JSON.stringify(users, null, 4));

        await interaction.member.roles.add(role);

        return interaction.update({
            content:
`🎉 **MUA THÀNH CÔNG**

👸 Bạn đã nhận được role **Công Chúa**

💰 Đã trừ **500.000 Xu**`,
            components: []
        });

    }

    // =====================
    // XÁC NHẬN QUẬN CHÚA
    // =====================

    if (interaction.customId === "confirm_duke") {

        const file = path.join(__dirname, "data", "users.json");

        let users = {};

        if (fs.existsSync(file)) {
            users = JSON.parse(fs.readFileSync(file, "utf8"));
        }

        const id = interaction.user.id;

        if (!users[id]) users[id] = { coins: 0 };

        if (users[id].coins < 1000000) {
            return interaction.update({
                content: "❌ Bạn không đủ **1.000.000 Xu** để mua **Quận Chúa**!",
                components: []
            });
        }

        const role = interaction.guild.roles.cache.get("1529466130035642368");

        if (!role) {
            return interaction.update({
                content: "❌ Không tìm thấy role Quận Chúa!",
                components: []
            });
        }

        users[id].coins -= 1000000;

        fs.writeFileSync(file, JSON.stringify(users, null, 4));

        await interaction.member.roles.add(role);

        return interaction.update({
            content:
`🎉 **MUA THÀNH CÔNG**

👑 Bạn đã nhận được role **Quận Chúa**

💰 Đã trừ **1.000.000 Xu**`,
            components: []
        });

    }

    // =====================
    // HỦY MUA
    // =====================

        if (interaction.customId === "cancel_buy") {

        return interaction.update({
            content: "❌ Đã hủy mua role.",
            components: []
        });

    }

}  

});


console.log("Bot đang khởi động...");

app.get("/", (req, res) => {
    res.send("PreBot is running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Web server đang chạy ở cổng ${PORT}`);
});

client.login(process.env.TOKEN);