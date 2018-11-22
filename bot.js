const Discord = require('discord.js');
const client = new Discord.Client();
var apiai = require('apiai');
var app = apiai(process.env.DF_CLIENT_ACCESS_TOKEN);

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
        const embed = new Discord.RichEmbed()
            .setTitle('WOWZER')
            .setColor(0xFF0000)
            .setDescription('RICH EMBED! :meguface:');
        // Send the embed to the same channel as the message
        message.channel.send(embed);
    }
    // Dialogflow Test
    if ((message.cleanContent.startsWith("@" + client.user.username) || message.channel.type == 'dm') && client.user.id != message.author.id) {
        var mess = remove(client.user.username, message.cleanContent);
        console.log(mess);
        const user = message.author.id;
        var promise = new Promise(function (resolve, reject) {
            var request = app.textRequest(mess, {
                sessionId: user
            });
            request.on('response', function (response) {
                console.log(response);
                var rep = response.result.fulfillment.speech;
                resolve(rep);
            });
            request.on('error', function (error) {
                resolve(null);
            });
            request.end();
        });
        (async function () {
            var result = await promise;
            if (result) {
                message.reply(result);
            } else {
                message.reply("nothing here");
            }
        }());
    }
});

function remove(username, text) {
    return text.replace("@" + username + " ", "");
}

client.login(process.env.BOT_TOKEN);