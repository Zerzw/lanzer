const TelegramBot = require('node-telegram-bot-api');
const request = require('request')
const cheerio = require('cheerio')

// replace the value below with the Telegram token you receive from @BotFather
const token = '1961873926:AAHrV2HHvcaTx_OcUHEs3HVLeZVf9St3aQo';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Recibí tu mensaje');
});

bot.onText(/\/dolar/, function (msg) {
    request('https://dolarhoy.com/cotizaciondolarblue', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var loadedHTML = cheerio.load(html);
            var contentContainer = loadedHTML('cotizacion_moneda').text();
            var soughtContent = contentContainer.substring(contentContainer.search("Bs."), contentContainer.search(" y el"));
            return bot.sendMessage(msg.chat.id, soughtContent); //outputs a value like `Bs. 1904,48`
        } else {
            console.log(error);
        }
    });
    console.log('Sent dollar value');
});