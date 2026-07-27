const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const gameFile = path.join(__dirname, "..", "games", "xucxac.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lac")
        .setDescription("Lắc xúc xắc"),

    async execute(interaction) {

        if (!fs.existsSync(gameFile)) {
            return interaction.reply({
                content: "❌ Chưa có ván xúc xắc nào!",
                ephemeral: true
            });
        }

        let game = JSON.parse(fs.readFileSync(gameFile, "utf8"));

        console.log("LAC:", game);

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

        fs.writeFileSync(gameFile, JSON.stringify(game, null, 4));
        console.log("LAC:", game);

        return interaction.reply(
            `🎲 <@${id}> đã lắc được **${roll} điểm**!`
        );
    }
};