const Discord   = require('discord.js');
const Client    = new Discord.Client();
const ApiAI     = require('apiai');
const App       = ApiAI(process.env.DF_CLIENT_ACCESS_TOKEN);

Client.on('ready', () => {
    console.log('Bot has started.');
});

Client.on('message', message => {
    // Dialogflow
    if ((message.cleanContent.startsWith("@" + Client.user.username) || message.channel.type == 'dm') && Client.user.id != message.author.id) {
        console.log(message.channel);
        var mess = remove(Client.user.username, message.cleanContent);
        console.log(mess);
        const user = message.author.id;
        var promise = new Promise(function (resolve, reject) {
            var request = App.textRequest(mess, {
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

Client.login(process.env.BOT_TOKEN);