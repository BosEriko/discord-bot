// DiscordJS Import
const Discord = require('discord.js')
const Client = new Discord.Client()

// Dialogflow Import
const ApiAI = require('apiai')
const App = ApiAI(process.env.DF_CLIENT_ACCESS_TOKEN)

// Other Import
const firebase = require('firebase')

// Modules Import
const webhooks: any = {
    rabbit: require('./modules/webhooks/rabbit'),
}

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
    const data: any = {
        message: message
    }
    if (message.guild.id !== "510302403031990272") {

    } else {
        if (message.channel.id === '526264102859964416' && Client.user.id !== message.author.id) {
            webhooks.rabbit(data)
        }
    }
})

// Discord Login
Client.login(process.env.BOT_TOKEN)