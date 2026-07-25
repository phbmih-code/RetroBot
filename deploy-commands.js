const { REST, Routes } = require("discord.js");
const commands = [
    {
        name: "ping",
        description: "Kiểm tra bot",
    },
    {
        name: "xu",
        description: "Xem số dư xu của bạn",
    },
    {
        name: "daily",
        description: "Nhận xu mỗi ngày",
},
{
        name: "xucxac",
        description: "Bắt đầu một ván xúc xắc",
},
{
        name: "lac",
        description: "Lắc xúc xắc",
},
{
        name: "shop",
        description: "Gửi cửa hàng role",
},
];

const token = process.env.TOKEN;
const CLIENT_ID = "1530151913184690208";
const GUILD_ID = "1529145028260135106";

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
    try {
        console.log("Đang đăng ký lệnh...");

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );

        console.log("✅ Đăng ký thành công!");
    } catch (error) {
        console.error(error);
    }
})();