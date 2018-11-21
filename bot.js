const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong');
    }else if(message.content === 'seishun') {
        message.reply('https://www.youtube.com/watch?v=3g9ihd-d2UY');
    }
});

client.login(process.env.BOT_TOKEN);