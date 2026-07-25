const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Kiểm tra bot"),

    async execute(interaction) {
        await interaction.reply("🏓 Pong!");
    },
};