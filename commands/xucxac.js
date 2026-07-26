const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const gameFile = path.join(
    __dirname,
    "..",
    "games",
    "xucxac.json"
);

const usersFile = path.join(
    __dirname,
    "..",
    "data",
    "users.json"
);


module.exports = {

    data: new SlashCommandBuilder()
        .setName("xucxac")
        .setDescription("Bắt đầu một ván xúc xắc"),


    async execute(interaction) {

        let game = {
            active: false,
            players: {}
        };


        if (fs.existsSync(gameFile)) {

            game = JSON.parse(
                fs.readFileSync(gameFile, "utf8")
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
            players: {},
            startedAt: Date.now()

        };


        fs.writeFileSync(
            gameFile,
            JSON.stringify(game, null, 4)
        );


        const embed = new EmbedBuilder()

            .setColor("Blue")

            .setTitle("🎲 XÚC XẮC")

            .setDescription(
`🎮 **Ván xúc xắc mới bắt đầu!**

👤 Người tạo: ${interaction.user}

⏰ Thời gian: **60 giây**

🎲 Dùng \`/lac\` để tham gia

🏆 Người cao nhất nhận **2000 xu**`
            );


        await interaction.reply({
            embeds: [embed]
        });



        setTimeout(async () => {


            let current = JSON.parse(
                fs.readFileSync(gameFile, "utf8")
            );


            if (!current.active) return;


            const players = current.players || {};

            const ids = Object.keys(players);



            if (ids.length === 0) {


                current.active = false;
                current.players = {};


                fs.writeFileSync(
                    gameFile,
                    JSON.stringify(current, null, 4)
                );


                return interaction.channel.send(
                    "⏰ Hết thời gian!\n❌ Không có ai chơi."
                );


            }



            let max = Math.max(
                ...Object.values(players)
            );


            const winners = ids.filter(
                id => players[id] === max
            );



            let users = {};


            if (fs.existsSync(usersFile)) {

                users = JSON.parse(
                    fs.readFileSync(usersFile, "utf8")
                );

            }



            const reward = Math.floor(
                2000 / winners.length
            );



            for (const id of winners) {


                if (!users[id]) {

                    users[id] = {
                        coins: 0
                    };

                }


                users[id].coins += reward;

            }



            fs.writeFileSync(
                usersFile,
                JSON.stringify(users, null, 4)
            );



            current.active = false;
            current.players = {};


            fs.writeFileSync(
                gameFile,
                JSON.stringify(current, null, 4)
            );



            let msg =
`🎲 **VÁN XÚC XẮC KẾT THÚC**

🏆 Điểm cao nhất: **${max}**

`;



            if (winners.length === 1) {


                msg +=
`👑 Người thắng: <@${winners[0]}>
💰 Nhận: **2000 xu**`;


            } else {


                msg +=
`🤝 Hòa ${winners.length} người

`;


                for (const id of winners) {

                    msg +=
`👤 <@${id}> nhận **${reward} xu**
`;

                }

            }



            await interaction.channel.send(msg)
                .catch(console.error);



            console.log(
                "🎲 Xúc xắc đã kết thúc"
            );


        }, 60000);



    }

};