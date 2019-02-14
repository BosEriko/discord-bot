// DiscordJS Import
const Discord = require('discord.js')
const Client = new Discord.Client()

// Dialogflow Import
const ApiAI = require('apiai')
const App = ApiAI(process.env.DF_CLIENT_ACCESS_TOKEN)

// Firebase Import
const firebase = require('firebase')

// Webhooks Import
const webhooks: any = {
    rabbit: require('./modules/webhooks/rabbit'),
}

// Modules Import

// Initialize Firebase
const firebaseConfig: object = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_PROJECT_ID + '.firebaseapp.com',
    databaseURL: 'https://' + process.env.FIREBASE_PROJECT_ID + '.firebaseio.com',
    storageBucket: process.env.FIREBASE_PROJECT_ID + '.appspot.com',
}
firebase.initializeApp(firebaseConfig)

// Bot Mount Event Trigger
Client.on('ready', () => {
    console.log('Bot is ready.')
})

// Bot Message Event Trigger
Client.on('message', (message: any) => {
    // Passed Data
    const data: any = {
        message: message,
        firebase: firebase
    }
    // Not Direct Message and not the bot itself
    if (message.channel.type !== 'dm' && Client.user.id !== message.author.id) {
        // Kuru Anime Only
        if (message.guild.id === "510302403031990272") {
            // Rabbit Cross Post
            if (message.channel.id === '526264102859964416') {
                webhooks.rabbit(data)
            }
        }
        // All Guild

    }
    // Direct Message and not the bot itself
    if (message.channel.type === 'dm' && Client.user.id !== message.author.id) {
        // Dialogflow Bot
        message.reply('Under Maintenance')
    }
})

// Discord Login
Client.login(process.env.BOT_TOKEN)