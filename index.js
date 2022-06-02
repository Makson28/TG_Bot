const TelegramApi = require("node-telegram-bot-api");
const token = "5344165102:AAE8t0jR2qlBwT6m2SWiBSa3L39pErjuBvo";

const bot = new TelegramApi(token, { polling: true });

const quizOptions = {
  quizOne: {
    question: "Дата створення JavaScript",
    rightAnswer: "2",
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "1998", callback_data: "1" },
          { text: "1995", callback_data: "2" },
          { text: "1993", callback_data: "3" },
        ],
      ],
    }),
  },

  quizTwo: {
    question: "Засновник JavaScript",
    rightAnswer: "3",
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "Марк Цукерберг", callback_data: "1" },
          { text: "Стів Джобс", callback_data: "2" },
          { text: "Брендан Ейх", callback_data: "3" },
        ],
      ],
    }),
  },
};

const start = () => {
  let rightAnsCount = 0;
  let ansCount = 0;

  bot.setMyCommands([
    { command: "/start", description: "Запустити бота" },
    { command: "/quiz", description: "Почати опитування" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      return bot.sendMessage(chatId, `Вітаю!!!`);
    }
    if (text === "/quiz") {
      await bot.sendMessage(chatId, `Відгадуй`);
      // return bot.sendMessage(chatId, quizOptions.quizOne.question, quizOptions.quizOne);

      switch (ansCount) {
        case 0:
          bot.sendMessage(chatId, quizOptions.quizOne.question, quizOptions.quizOne);
          break;
        
        case 1:
          bot.sendMessage(chatId, quizOptions.quizTwo.question, quizOptions.quizTwo);
          break;
      
        default:
          break;
      }
     
    }
    return bot.sendMessage(chatId, `Я тебе не розумію спробуй ще раз!`);
  });

  bot.on("callback_query", async (msg) => {
    const rightAnswer = quizOptions.quizOne.rightAnswer;  // quizOne and quizTwo
    const data = msg.data;
    const chatId = msg.message.chat.id;
    // console.log(msg);
    // console.log(quizOptions);
    if (data === rightAnswer) {
      rightAnsCount ++;
      ansCount ++;
      return bot.sendMessage(chatId, `True`);
    } else {
      ansCount ++;
      return bot.sendMessage(chatId, `False`);
    }
  });
};

start();
