const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Bot is ready.');
});

client.on('message', message => {
    if (message.content === 'ka!help') {
        message.reply('No one will help you.');
    }
    if (message.content === 'ka!avatar') {
        message.reply(message.author.avatarURL);
    }
});

client.login(process.env.BOT_TOKEN);