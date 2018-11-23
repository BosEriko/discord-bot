const Discord = require('discord.js');
const Client = new Discord.Client();
const ApiAI = require('apiai');
const App = ApiAI(process.env.DF_CLIENT_ACCESS_TOKEN);

Client.on('ready', () => {
    console.log('Bot is ready.');
});

Client.on('message', message => {
    if ((message.channel.name === "kuru-anime" || message.channel.type === 'dm') && Client.user.id !== message.author.id) {
        let promise = new Promise((resolve, reject) => {
            let request = App.textRequest(message.cleanContent, {
                sessionId: message.author.id
            });
            request.on('response', (response) => {
                console.log(response);
                let rep = response.result.fulfillment.speech;
                resolve(rep);
            });
            request.on('error', (error) => {
                resolve(null);
            });
            request.end();
        });
        (async function () {
            let result = await promise;
            if (result) {
                if (result === "rules") {
                    const embed = new Discord.RichEmbed()
                        .setTitle('Rules')
                        .setColor(0xcd3c2a)
                        .setDescription(`1. test
                        2. test again`);
                    message.channel.send(embed);
                } else {
                    message.reply(result);
                }
            } else {
                message.reply("nothing here");
            }
        }());
    }
});

Client.login(process.env.BOT_TOKEN);