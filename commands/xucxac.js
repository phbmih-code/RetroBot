const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("give")
        .setDescription("Cho xu cho người khác")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Người nhận xu")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("Số xu muốn cho")
                .setRequired(true)
        ),

    async execute(interaction) {

        const file = path.join(__dirname, "..", "data", "users.json");

        const users = JSON.parse(
            fs.readFileSync(file, "utf8")
        );

        const giver = interaction.user.id;
        const receiver = interaction.options.getUser("user");
        const amount = interaction.options.getInteger("amount");


        if (receiver.id === giver) {
            return interaction.reply({
                content: "❌ Không thể tự give xu cho chính mình!",
                ephemeral: true
            });
        }


        if (amount <= 0) {
            return interaction.reply({
                content: "❌ Số xu phải lớn hơn 0!",
                ephemeral: true
            });
        }


        if (!users[giver]) {
            users[giver] = { coins: 0 };
        }

        if (!users[receiver.id]) {
            users[receiver.id] = { coins: 0 };
        }


        if (users[giver].coins < amount) {
            return interaction.reply({
                content: "❌ Bạn không đủ xu để cho!",
                ephemeral: true
            });
        }


        users[giver].coins -= amount;
        users[receiver.id].coins += amount;


        fs.writeFileSync(
            file,
            JSON.stringify(users, null, 4)
        );


        return interaction.reply(
`💸 **GIVE XU THÀNH CÔNG**

👤 Người gửi: ${interaction.user}
🎁 Người nhận: ${receiver}

💰 Số xu: **${amount.toLocaleString()} xu**`
        );
    }
};