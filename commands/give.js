const fs = require("fs");

module.exports = {
    data: {
        name: "give",
        description: "Cho xu cho người khác",
        options: [
            {
                name: "user",
                description: "Người nhận xu",
                type: 6,
                required: true
            },
            {
                name: "amount",
                description: "Số xu muốn cho",
                type: 4,
                required: true
            }
        ]
    },

    async execute(interaction) {

        const file = "./data/users.json";
        const users = JSON.parse(fs.readFileSync(file));

        const sender = interaction.user.id;
        const receiver = interaction.options.getUser("user");
        const amount = interaction.options.getInteger("amount");


        if (receiver.id === sender) {
            return interaction.reply({
                content: "❌ Không thể tự cho xu cho chính mình!",
                ephemeral: true
            });
        }


        if (amount <= 0) {
            return interaction.reply({
                content: "❌ Số xu phải lớn hơn 0!",
                ephemeral: true
            });
        }


        if (!users[sender]) {
            users[sender] = { coins: 0 };
        }

        if (!users[receiver.id]) {
            users[receiver.id] = { coins: 0 };
        }


        if (users[sender].coins < amount) {
            return interaction.reply({
                content: "❌ Bạn không đủ xu!",
                ephemeral: true
            });
        }


        users[sender].coins -= amount;
        users[receiver.id].coins += amount;


        fs.writeFileSync(
            file,
            JSON.stringify(users, null, 4)
        );


        interaction.reply(
`💸 **GIVE XU THÀNH CÔNG**

👤 Người gửi: ${interaction.user}
🎁 Người nhận: ${receiver}

💰 Số xu: **${amount.toLocaleString()} xu**`
        );

    }
};