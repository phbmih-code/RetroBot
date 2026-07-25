const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("xu")
        .setDescription("Xem số dư xu của bạn"),

    async execute(interaction) {
    console.log("Đã chạy lệnh /xu");

    const file = path.join(__dirname, "..", "data", "users.json");

        let users = {};

        if (fs.existsSync(file)) {
            users = JSON.parse(fs.readFileSync(file, "utf8"));
        }

        const id = interaction.user.id;

        if (!users[id]) {
            users[id] = {
                coins: 0
            };

            fs.writeFileSync(file, JSON.stringify(users, null, 4));
        }

        const embed = new EmbedBuilder()
            .setColor("Gold")
            .setTitle("💰 Số dư")
            .setDescription(`Bạn hiện có **${users[id].coins} xu**.`)
            .setFooter({
                text: interaction.user.username
            });

        await interaction.reply({
            embeds: [embed]
        });
    }
};