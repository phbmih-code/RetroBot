const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Nhận xu mỗi ngày"),

    async execute(interaction) {
        const file = path.join(__dirname, "..", "data", "users.json");

        let users = {};

        if (fs.existsSync(file)) {
            users = JSON.parse(fs.readFileSync(file, "utf8"));
        }

        const id = interaction.user.id;

        if (!users[id]) {
            users[id] = {
                coins: 0,
                daily: 0
            };
        }

        const now = Date.now();
        const cooldown = 24 * 60 * 60 * 1000;

        if (users[id].daily && now - users[id].daily < cooldown) {
            const timeLeft = cooldown - (now - users[id].daily);
            const hours = Math.floor(timeLeft / 3600000);

            return interaction.reply({
                content: `⏳ Bạn đã nhận daily rồi! Quay lại sau **${hours} giờ**.`,
                ephemeral: true
            });
        }

        users[id].coins += 1000;
        users[id].daily = now;

        fs.writeFileSync(file, JSON.stringify(users, null, 4));

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("🎁 Daily thành công!")
            .setDescription(
                `Bạn nhận được **+1000 xu**!\n💰 Số dư hiện tại: **${users[id].coins} xu**`
            );

        await interaction.reply({
            embeds: [embed]
        });
    }
};