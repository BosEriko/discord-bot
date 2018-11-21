const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Bot is ready.');
});

client.on('message', message => {
    if (message.content === 'ka!help') {
        message.reply('No one will help you.');
    }
});

client.login(process.env.BOT_TOKEN);