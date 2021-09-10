require ('dotenv').config()
const {Telegraf} = require('telegraf')
const request = require('request');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.onText(/\/granos (.+)/, (msg, match) => {
    let granos = match[1];
    let chatId = msg.chat.id;
    request(`https://news.agrofy.com.ar/granos/precios-pizarra`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            bot.sendMessage(chatId, '_Looking for _' + granos + '...', { parse_mode: 'Markdown' })
                .then((msg) => {
                    let res = JSON.parse(body);
                    bot.sendPhoto(chatId, res.Poster, { caption: 'Result: 
                                                       nTitle: ' + res.Title + '
                                                       nYear: ' + res.Year + '
                                                       nRated: ' + res.Rated + '
                                                       nReleased: ' + res.Released + '
                                                       nRuntime: ' + res.Runtime + '
                                                       nGenre: ' + res.Genre + '
                                                       nDirector: ' + res.Director + '
                                                       nPlot: ' + res.Plot '})
                        .catch((err) => {
                            if (err) {
                                bot.sendMessage(chatId, 'Bad request, Please check the title and try again');
                            }
                        })
                })

        }
    })
})




app.listen(port, function () {
    console.log(`Server is up on port ${port}`);
});