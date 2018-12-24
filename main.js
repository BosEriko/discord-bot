const Discord = require('discord.js')
const ApiAI = require('apiai')
const firebase = require('firebase')
const Axios = require('axios')

const Client = new Discord.Client()
const App = ApiAI(process.env.DF_CLIENT_ACCESS_TOKEN)

// Bot Modules
const botDF = require('./features/bot-df')
const botElection = require('./features/bot-election')
const botFun = require('./features/bot-fun')
const botPost = require('./features/bot-post')
const botTopic = require('./features/bot-topic')
const botUserData = require('./features/bot-user-data')

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

// Symbol Command of Fun
const symbolCommand = '/'

// Bot Ready Message
Client.on('ready', () => {
    console.log('Bot is ready.')
})

// New User
Client.on('guildMemberAdd', member => {
    member.send('Hello! Thanks for joining ' + appTitle + '! Feel free to talk to me here or if you prefer, talk to me on the #kuru-anime channel. Don\'t forget to read our rules, okay? Have a nice stay!')
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error)
})

// Main Code
Client.on('message', message => {
    botDF.botDF(message, Client, App)
    botElection.botElection(message, Client)
    botFun.botFun(message, symbolCommand, Discord, Client, firebaseDatabase)
    botPost.botPost(message, Client, Axios)
    botTopic.botTopic(message, Client, symbolCommand)
    botUserData.botUserData(message, firebaseDatabase)
})

// Discord Login
Client.login(process.env.BOT_TOKEN)