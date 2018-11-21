const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.js');

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong');
    }
});

client.login(token.bot_token);