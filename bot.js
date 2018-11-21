const Discord = require('discord.js');
const client = new Discord.Client();

app.listen(process.env.PORT || 5000);

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong');
    }
});

client.login(process.env.BOT_TOKEN);