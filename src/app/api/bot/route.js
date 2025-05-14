require('dotenv').config();
const { Bot } = require("grammy");

// Telegram 봇 토큰
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// 봇 초기화
await bot.init();

// /start 명령어 처리
bot.command("start", async (ctx) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: "🔘 Start Exploring 🚀", web_app: { url: "https://stellagame.vercel.app/" } }],  // 게임 링크 수정
      [{ text: "🔘 Follow on X 🐦", url: "https://x.com/SARM_OfficialX" }],
      [{ text: "🔘 Join Telegram Chat 💬", url: "https://t.me/sarm_official" }],
      [{ text: "🔘 Visit Website 🌐", url: "https://www.stella-armada.xyz" }],
      [{ text: "🔘 Read Whitepaper 📘", url: "https://stella-armada.gitbook.io/stella-armada/" }],
    ],
  };

  const message = `
🪐 Welcome to Stella Armada! 🚀✨
You've entered the world of Play to Conquer, where strategy meets exploration — and every mission earns you real rewards.

🌟 What you can do here:
🛰 Explore planets and complete space missions
🏙 Build futuristic cities across new worlds
🚀 Command and upgrade your own interstellar fleet
💰 Earn $SARM tokens as a galactic pioneer

🔄 From mission to mastery, from strategy to supremacy — it all begins here.

🚀 Ready to begin your journey and earn $SARM?
Tap a button below to launch your command!
  `;

  const pngUrl = 'https://stellabot-five.vercel.app/stellapic.png';  // public 폴더에 있는 이미지 파일 경로

  // ✅ GIF + 메시지 + 버튼을 한 번에 보냄
  await ctx.replyWithPhoto(pngUrl, {
    caption: message,
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
});

// ✅ Vercel 서버리스 API로 실행
export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Bot Error:", error);
    return new Response("Error", { status: 500 });
  }
}

