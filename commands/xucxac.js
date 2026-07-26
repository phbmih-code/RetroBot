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
            owner: interaction.user.id,
            players: [
                {
                    id: interaction.user.id,
                    name: interaction.user.username
                }
            ]
        };


        fs.writeFileSync(
            file,
            JSON.stringify(game, null, 4)
        );


        const embed = new EmbedBuilder()
            .setTitle("🎲 XÚC XẮC")
            .setDescription(
`Một ván xúc xắc đã bắt đầu!

👑 Người tạo: ${interaction.user}

Dùng:
\`/lac\` để lắc xúc xắc`
            )
            .setColor("Blue");


        await interaction.reply({
            embeds: [embed]
        });

    }
};