const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Bot is ready.');
});

client.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong');
    }
});

client.on('message', message => {
    if (message.content === 'pung') {
        message.reply('peng');
    }
});

client.on('message', message => {
    if(message.content === 'seishun') {
        message.reply('https://www.youtube.com/watch?v=3g9ihd-d2UY');
    }
});

client.login(process.env.BOT_TOKEN);