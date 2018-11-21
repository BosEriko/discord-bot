const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Bot is ready.');
});

client.on('message', message => {
    // Help Message
    if (message.content === 'ka!help') {
        message.reply('No one will help you.');
    }
    // Show Avatar
    if (message.content === 'ka!avatar') {
        message.reply(message.author.avatarURL);
    }
    // WOW
    if (message.content === 'ka!wow') {
        message.channel.send('WOW');
    }
    // Rich Embed
    if (message.content === 'ka!wowzer') {
        const embed = new RichEmbed()
            .setTitle('WOWZER')
            .setColor(0xFF0000)
            .setDescription('RICH EMBED! :meguface:');
        // Send the embed to the same channel as the message
        message.channel.send(embed);
    }
});

client.login(process.env.BOT_TOKEN);