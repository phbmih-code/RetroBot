const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("xucxac")
        .setDescription("Bắt đầu một ván xúc xắc"),

    async execute(interaction) {
        const file = path.join(__dirname, "..", "games", "xucxac.json");

        let game = {};

        if (fs.existsSync(file)) {
            game = JSON.parse(fs.readFileSync(file, "utf8"));
        }

        if (game.active) {
            return interaction.reply({
                content: "🎲 Đang có một ván xúc xắc diễn ra!",
                ephemeral: true
            });
        }

        game = {
            active: true,
            players: {},
            start: Date.now()
        };

        fs.writeFileSync(file, JSON.stringify(game, null, 4));

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("🎲 Xúc xắc bắt đầu!")
            .setDescription(
                "⏰ Thời gian: **60 giây**\n\n" +
                "Dùng `/lac` để tham gia!\n" +
                "Mỗi người chỉ được lắc **1 lần**."
            );

        await interaction.reply({
            embeds: [embed]
        });

        setTimeout(async () => {
            let data = JSON.parse(fs.readFileSync(file, "utf8"));

            if (!data.active) return;

            const players = Object.entries(data.players);

            if (players.length === 0) {
                await interaction.followUp("❌ Không có ai tham gia!");
            } else {
                let winner = players[0];

                for (const player of players) {
                    if (player[1] > winner[1]) {
                        winner = player;
                    }
                }

                const usersFile = path.join(__dirname, "..", "data", "users.json");

let users = {};

if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile, "utf8"));
}

const winnerId = winner[0];

if (!users[winnerId]) {
    users[winnerId] = {
        coins: 0
    };
}

users[winnerId].coins += 500;

fs.writeFileSync(
    usersFile,
    JSON.stringify(users, null, 4)
);

await interaction.followUp(
    `🏆 Người thắng: <@${winnerId}>\n🎲 Điểm: **${winner[1]}**\n💰 Nhận **+500 xu**!`
);
            }

            data.active = false;
            fs.writeFileSync(file, JSON.stringify(data, null, 4));

        }, 60000);
    }
};