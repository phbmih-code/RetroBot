const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("Gửi cửa hàng role")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor("Gold")
            .setTitle("🏰 CỬA HÀNG HOÀNG GIA")
            .setDescription(
`🤴 **HOÀNG TỬ**
> 💰 **500.000 Xu**
> ✨ Quản lý Server
> ⚠️ Không được Mute

👸 **CÔNG CHÚA**
> 💰 **500.000 Xu**
> ✨ Quản lý Server
> ⚠️ Không được Mute

👑 **QUẬN CHÚA**
> 💰 **1.000.000 Xu**
> ✨ Quản lý Server
> ✨ Timeout thành viên
> ✨ Mute thành viên`
            );

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("buy_prince")
                .setLabel("🤴 Hoàng Tử")
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId("buy_princess")
                .setLabel("👸 Công Chúa")
                .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
                .setCustomId("buy_duke")
                .setLabel("👑 Quận Chúa")
                .setStyle(ButtonStyle.Success)
        );

        const channel = await interaction.guild.channels.fetch("1530274300639318136");

        await channel.send({
            embeds: [embed],
            components: [row],
        });

        await interaction.reply({
            content: "✅ Đã gửi cửa hàng.",
            ephemeral: true,
        });
    },
};