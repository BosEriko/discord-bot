// DiscordJS Import
const Discord = require('discord.js')
const Client = new Discord.Client()

// Dialogflow Import
const ApiAI = require('apiai')
const App = ApiAI(process.env.DF_CLIENT_ACCESS_TOKEN)

// Other Import
const firebase = require('firebase')
const Axios = require('axios')

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
    if (message.channel.type === 'dm' && Client.user.id !== message.author.id)
        message.reply("Under Maintenance!")
})

// Discord Login
Client.login(process.env.BOT_TOKEN)