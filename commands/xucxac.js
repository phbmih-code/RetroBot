const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("xucxac")
        .setDescription("Bắt đầu một ván xúc xắc"),

    async execute(interaction) {

        const file = path.join(__dirname, "..", "games", "xucxac.json");

        let game = {
            active: false
        };

        if (fs.existsSync(file)) {
            game = JSON.parse(
                fs.readFileSync(file, "utf8")
            );
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
            players: [],
            createdAt: Date.now()
        };


        fs.writeFileSync(
            file,
            JSON.stringify(game, null, 4)
        );


        const embed = new EmbedBuilder()
            .setTitle("🎲 XÚC XẮC")
            .setDescription(
`🎮 **Một ván xúc xắc mới đã bắt đầu!**

👤 Người tạo: ${interaction.user}

⏰ Thời gian tham gia: **60 giây**

Dùng \`/lac\` để tham gia lắc xúc xắc!`
            )
            .setColor("Blue");


        await interaction.reply({
            embeds: [embed]
        });



        // Tự kết thúc sau 60 giây
        setTimeout(() => {

            if (!fs.existsSync(file)) return;


            let current = JSON.parse(
                fs.readFileSync(file, "utf8")
            );


            if (current.active) {

                current.active = false;
                current.endedAt = Date.now();


                fs.writeFileSync(
                    file,
                    JSON.stringify(current, null, 4)
                );


                console.log("🎲 Ván xúc xắc đã kết thúc sau 60 giây");
            }


        }, 60000);

    }
};