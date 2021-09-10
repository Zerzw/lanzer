require ('dotenv').config()
const {Telegraf} = require('telegraf')
const request = require('request')
const axios = require('axios')
const cheerio = require('cheerio')
const url = "https://news.agrofy.com.ar/granos/precios-pizarra"
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {

    ctx.reply('Bienvenido a Lanzer Corporation')
})

bot.command(['Mycomando','Micomando','Comando','comando'], (ctx) => {

    ctx.reply('Hola bienvenido al comando, accediste correctamente')
})

bot.hears('Computadora', (ctx) => {
    ctx.reply('Has introducido la palabra computadora')
})

bot.hears('Granos', (ctx) => {
    axios.get('https://news.agrofy.com.ar/granos/precios-pizarra')
    
    .then((response) => {
		ctx.reply('#main-section > div.fluid-container.col-lg-9.px-0 > section.container > div.board-prices-content > div.board-prices-content__table.mb-15.gray-tabs > div > div')
	})
	
    .catch((error) => {
		console.error(error)
	});

})

bot.on('text', (ctx) => {

    ctx.reply('Estás escribiendo un mensaje, no seas pesado')
})

bot.on('Granitos', async function init(){
    const $ = await request({
        uri: 'https://news.agrofy.com.ar/granos/precios-pizarra'
        transform: body => cheerio.load(body)

    });

    console.log($)

})

bot.on(/\/dolar/, function (msg) {
    request('https://Twitter.com/DolarToday', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var loadedHTML = cheerio.load(html);
            var contentContainer = loadedHTML('p.ProfileHeaderCard-bio').text();
            var soughtContent = contentContainer.substring(contentContainer.search("Bs."), contentContainer.search(" y el"));
            return bot.sendMessage(msg.chat.id, soughtContent);
        } else {
            console.log(error);
        }
    });
    console.log('Sent dollar value');
});

bot.launch()