require ('dotenv').config()
const {Telegraf} = require('telegraf')
const axios = require('axios')
const request = require('request');

axios
	.get('https://news.agrofy.com.ar/granos/precios-pizarra')
	.then((response) => {
		console.log(response)
	})
	.catch((error) => {
		console.error(error)
	});

bot.start((ctx) => {

    ctx.reply('Bienvenido a Lanzer Corporation')
})

bot.command(['Mycomando','Micomando','Comando','comando'], (ctx) => {

    ctx.reply('Hola bienvenido al comando')
})

bot.hears('Computadora', (ctx) => {

    ctx.reply('Has introducido la palabra computadora')
})

bot.on('text', ctx => {

    ctx.reply('Estás escribiendo, pesado')
})

bot.on(/\/dolar/, function (msg) {
    request('https://Twitter.com/DolarToday', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var loadedHTML = cheerio.load(html);
            var contentContainer = loadedHTML('p.ProfileHeaderCard-bio').text();
            var soughtContent = contentContainer.substring(contentContainer.search("Bs."), contentContainer.search(" y el"));
            return bot.sendMessage(msg.chat.id, soughtContent); //outputs a value like `Bs. 1904,48`
        } else {
            console.log(error);
        }
    });
    console.log('Sent dollar value');
});

bot.launch()