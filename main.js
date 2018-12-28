const Discord = require('discord.js')
const ApiAI = require('apiai')
const firebase = require('firebase')
const Axios = require('axios')

const Client = new Discord.Client()
const App = ApiAI(process.env.DF_CLIENT_ACCESS_TOKEN)

// Bot Modules
const botDF = require('./features/bot-df')
const botFun = require('./features/bot-fun')
const botPostAnnouncements = require('./features/bot-post-announcements')
const botPostRabbit = require('./features/bot-post-rabbit')
const botTopic = require('./features/bot-topic')
const botUserData = require('./features/bot-user-data')
const botVideoOnly = require('./features/bot-video-only')

// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_PROJECT_ID + '.firebaseapp.com',
    databaseURL: 'https://' + process.env.FIREBASE_DATABASE_NAME + '.firebaseio.com',
    storageBucket: process.env.FIREBASE_BUCKET + '.appspot.com',
}
firebase.initializeApp(firebaseConfig)

// Initialize Firebase Database
const firebaseDatabase = firebase.database().ref(process.env.FIREBASE_PERSONAL_API_KEY)

// App Title
const appTitle = 'Kuru Anime'

// Symbol Command
const symbolCommand = '/'

// Passive Commands
const passiveCommands = true

// Bot Ready Message
Client.on('ready', () => {
    console.log('Bot is ready.')
})

// New User
Client.on('guildMemberAdd', member => {
    member.send('Hello! Thanks for joining **' + appTitle + '**! Feel free to talk to me here or if you prefer, talk to me on the **#kuru-anime** channel inside the server. Don\'t forget to read **#rules**, okay? Have a nice stay!')
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error)
})

// Main Code
Client.on('message', message => {
    botFun.botFun(message, symbolCommand, Discord, Client, firebaseDatabase)
    botTopic.botTopic(message, Client, symbolCommand, firebaseDatabase)
    botUserData.botUserData(message, firebaseDatabase)
    // Dialogflow Bot
    if ((message.channel.id === '514736191095177246' || message.channel.type === 'dm') && Client.user.id !== message.author.id) botDF.botDF(App, message)
    // Post to #rabbit using the Webhook
    if (message.channel.id === '526264102859964416' && Client.user.id !== message.author.id) botPostRabbit.botPostRabbit(Axios, message)
    // Post to #announcements using the Webhook
    if (message.channel.id === '526264250230898698' && Client.user.id !== message.author.id) botPostAnnouncements.botPostAnnouncements(Axios, message)
    // All posts on #video will be deleted unless they are a YouTube url
    if (message.channel.id === '528028883623346211' && Client.user.id !== message.author.id) botVideoOnly.botVideoOnly(message)
})

// Discord Login
Client.login(process.env.BOT_TOKEN)