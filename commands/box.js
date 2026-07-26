const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "..", "data", "users.json");
const boxFile = path.join(__dirname, "..", "games", "box.json");


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = {

    data: new SlashCommandBuilder()
        .setName("box")
        .setDescription("Mở hộp may mắn"),


    async execute(interaction) {


        const row1 = new ActionRowBuilder()
.addComponents(

    new ButtonBuilder()
    .setCustomId("box_1")
    .setEmoji("📦")
    .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
    .setCustomId("box_2")
    .setEmoji("📦")
    .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
    .setCustomId("box_3")
    .setEmoji("📦")
    .setStyle(ButtonStyle.Primary)

);

const row2 = new ActionRowBuilder()
.addComponents(

    new ButtonBuilder()
    .setCustomId("box_4")
    .setEmoji("📦")
    .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
    .setCustomId("box_5")
    .setEmoji("📦")
    .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
    .setCustomId("box_6")
    .setEmoji("📦")
    .setStyle(ButtonStyle.Primary)

);

        const embed = new EmbedBuilder()
.setColor("#FFD700")
.setTitle("🎁 HỘP MAY MẮN")
.setDescription(
`👤 Người chơi: ${interaction.user}

💰 Chọn một hộp để mở.

━━━━━━━━━━━━━━━━━━━━━━━
✨ Chúc bạn may mắn!`
)
.setThumbnail(interaction.user.displayAvatarURL())
.setFooter({
    text: "PreBot • Lucky Box"
});


        await interaction.reply({

            embeds: [embed],

            components: [
                row1,
                row2
            ]

        });

    }
};