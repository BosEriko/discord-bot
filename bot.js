const Discord   = require('discord.js');
const ApiAI     = require('apiai');
const firebase  = require("firebase");

const Client    = new Discord.Client();
const App       = ApiAI(process.env.DF_CLIENT_ACCESS_TOKEN);

// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_PROJECT_ID + ".firebaseapp.com",
    databaseURL: "https://" + process.env.FIREBASE_DATABASE_NAME + ".firebaseio.com",
    storageBucket: process.env.FIREBASE_BUCKET + ".appspot.com",
};
firebase.initializeApp(firebaseConfig);

// Rules Text
const rulesText = `**1.** Please do not be an asshole!
**2.** Do not post outside links.
**3.** Please talk in English only.
**4.** Only talk to the bots on their own channels.`;

// Bot Ready Message
Client.on('ready', () => {
    console.log('Bot is ready.');
});

// New User
Client.on('guildMemberAdd', member => {
    member.send('hello!')
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error);
});

// Main Code
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
                if (result === "M46?91GZWhP[RAQ") {
                    const embed = new Discord.RichEmbed()
                        .setTitle('Rules to obey')
                        .setColor(0xcd3c2a)
                        .setAuthor('Kuru Anime')
                        .setThumbnail('https://i.imgur.com/5q2WR9V.png')
                        .setDescription(rulesText);
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

// Discord Login
Client.login(process.env.BOT_TOKEN);