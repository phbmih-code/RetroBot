const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lac")
        .setDescription("Lắc xúc xắc"),

    async execute(interaction) {
        const file = path.join(__dirname, "..", "games", "xucxac.json");

        let game = {};

        if (fs.existsSync(file)) {
            game = JSON.parse(fs.readFileSync(file, "utf8"));
        }

        if (!game.active) {
            return interaction.reply({
                content: "❌ Hiện không có ván xúc xắc nào!",
                ephemeral: true
            });
        }

        const id = interaction.user.id;

        if (game.players[id]) {
            return interaction.reply({
                content: "🎲 Bạn đã lắc rồi!",
                ephemeral: true
            });
        }

        const roll = Math.floor(Math.random() * 6) + 1;

        game.players[id] = roll;

        fs.writeFileSync(file, JSON.stringify(game, null, 4));

        await interaction.reply(
            `🎲 <@${id}> đã lắc được **${roll}** điểm!`
        );
    }
};