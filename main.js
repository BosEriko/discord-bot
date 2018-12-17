const Discord       = require('discord.js');
const ApiAI         = require('apiai');
const firebase      = require('firebase');
const Axios         = require('axios');

const Client        = new Discord.Client();
const App           = ApiAI(process.env.DF_CLIENT_ACCESS_TOKEN);

// Bot Modules
const botFun        = require('./features/bot-fun');
const botElection   = require('./features/bot-election');
const botTopic      = require('./features/bot-topic');

// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_PROJECT_ID + '.firebaseapp.com',
    databaseURL: 'https://' + process.env.FIREBASE_DATABASE_NAME + '.firebaseio.com',
    storageBucket: process.env.FIREBASE_BUCKET + '.appspot.com',
};
firebase.initializeApp(firebaseConfig);

// App Title
const appTitle = 'Kuru Anime';

// Symbol Command of Fun
const symbolCommand = '~';

// Bot Ready Message
Client.on('ready', () => {
    console.log('Bot is ready.');
});

// New User
Client.on('guildMemberAdd', member => {
    member.send('Hello! Thanks for joining ' + appTitle + '! Feel free to talk to me here or if you prefer, talk to me on the #kuru-anime channel. Don\'t forget to read our rules, okay? Have a nice stay!')
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error);
});

// Main Code
Client.on('message', message => {
    botFun.botFun(message, symbolCommand, Discord, Client);
    botElection.botElection(message, Client, firebase);
    botTopic.botTopic(message, Client, symbolCommand);
    // Rabbit Post
    if (message.channel.name === 'rabbit-post' && Client.user.id !== message.author.id) {
        Axios.post(process.env.RABBIT_WEBHOOK, {
            "content": message.content
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    // Announcements Post
    if (message.channel.name === 'announcements-post' && Client.user.id !== message.author.id) {
        Axios.post(process.env.ANNOUNCEMENTS_WEBHOOK, {
            "content": message.content
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    // Dialogflow
    if ((message.channel.name === 'kuru-anime' || message.channel.type === 'dm') && Client.user.id !== message.author.id) {
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
                message.reply(result);
            } else {
                message.reply('nothing here');
            }
        }());
    }
});

// Discord Login
Client.login(process.env.BOT_TOKEN);