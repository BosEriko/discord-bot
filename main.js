const Discord   = require('discord.js')
const Client    = new Discord.Client()

const ApiAI     = require('apiai')
const App       = ApiAI(process.env.DF_CLIENT_ACCESS_TOKEN)
const Axios     = require('axios')
const firebase  = require('firebase')

// Bot Modules
const botCommands           = require('./scripts/commands')
const botDF                 = require('./scripts/dialogflow')
const botMarket             = require('./scripts/market')
const botPassive            = require('./scripts/passive')
const botPostAnnouncements  = require('./scripts/post-announcements')
const botPostRabbit         = require('./scripts/post-rabbit')
const botTopic              = require('./scripts/topic')
const botVideoOnly          = require('./scripts/video-only')

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

// Cooldown Storage
const cooldownStorage = new Set()

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

// Set Status
Client.setPresence({
    game: {
        name: "Kuru Anime"
    },
    status: 'idle'
})

// Main Code
Client.on('message', message => {
    // Passive Comands
    if (message.channel.type !== 'dm' && Client.user.id !== message.author.id)
        botPassive.botPassive(cooldownStorage, firebaseDatabase, message)
    // Kuru Commands
    if ((message.channel.id === '517566179242672137' || message.channel.id === '523150879562661892') && Client.user.id !== message.author.id)
        botCommands.botCommands(Discord, firebaseDatabase, message, symbolCommand)
    // Topic of the Day on #general
    if (message.channel.id === '510302403031990274' && Client.user.id !== message.author.id)
        botTopic.botTopic(firebaseDatabase, message, symbolCommand)
    // Dialogflow Bot
    if ((message.channel.id === '514736191095177246' || message.channel.type === 'dm') && Client.user.id !== message.author.id)
        botDF.botDF(App, message)
    // Post to #rabbit using the Webhook
    if (message.channel.id === '526264102859964416' && Client.user.id !== message.author.id)
        botPostRabbit.botPostRabbit(Axios, message)
    // Post to #announcements using the Webhook
    if (message.channel.id === '526264250230898698' && Client.user.id !== message.author.id)
        botPostAnnouncements.botPostAnnouncements(Axios, message)
    // All posts on #video will be deleted unless they are a YouTube url
    if (message.channel.id === '528028883623346211' && Client.user.id !== message.author.id)
        botVideoOnly.botVideoOnly(message)
    // Kuru Market
    if ((message.channel.id === '528252653390790676' || message.channel.id === '528253499893350430') && Client.user.id !== message.author.id)
        botMarket.botMarket(appTitle, Discord, firebaseDatabase, message, symbolCommand)
})

// Discord Login
Client.login(process.env.BOT_TOKEN)