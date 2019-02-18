// =======================================================================================================[ Sentry Import ]===== //
import * as Sentry from '@sentry/browser'

// ====================================================================================================[ DiscordJS Import ]===== //
const Discord = require('discord.js')
const Client = new Discord.Client()

// ===================================================================================================[ Dialogflow Import ]===== //
const df = require('apiai')
const dfClient = df(process.env.DF_CLIENT_ACCESS_TOKEN)

// ========================================================================================================[ Other Import ]===== //
const firebase = require('firebase')
const axios = require('axios')

// =====================================================================================================[ Webhooks Import ]===== //
const webhooks: any = {
    announcements: require('./modules/webhooks/announcements'),
    rabbit: require('./modules/webhooks/rabbit'),
    waifuRating: require('./modules/webhooks/waifuRating'),
}

// ======================================================================================================[ Modules Import ]===== //
const dialogflow: any = require('./modules/dialogflow')
const prefix: any = require('./modules/prefix')

// ===================================================================================================[ Initialize Sentry ]===== //
Sentry.init({ dsn: 'https://6777645d9bbd45a4bee12fa056c2d413@sentry.io/1394578' })

// =================================================================================================[ Initialize Firebase ]===== //
const firebaseConfig: object = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_PROJECT_ID + '.firebaseapp.com',
    databaseURL: 'https://' + process.env.FIREBASE_PROJECT_ID + '.firebaseio.com',
    storageBucket: process.env.FIREBASE_PROJECT_ID + '.appspot.com',
}
firebase.initializeApp(firebaseConfig)

// ========================================================================================[ Initialize Firebase Database ]===== //
const database: any = firebase.database()

// =============================================================================================[ Bot Mount Event Trigger ]===== //
Client.on('ready', () => {
    console.log('Bot is ready.')
})

// ===========================================================================================[ Bot Message Event Trigger ]===== //
Client.on('message', (message: any) => {
    // ==================================================================================================[ Get the Prefix ]===== //
    let guildPrefix: string
    // ==================================================================================================[ Get the Prefix ]===== //
    database.ref('guild').child(`${message.guild.id}/prefix`).once('value').then((snap: any) => {
        if (snap.exists()) {
            guildPrefix = snap.val()
        } else {
            guildPrefix = "/"
            database.ref('guild').child(`${message.guild.id}/prefix`).set(guildPrefix)
        }
    })
    // =======================================================================[ Not Direct Message and not the bot itself ]===== //
    if (message.channel.type !== 'dm' && Client.user.id !== message.author.id) {
        // =============================================================================================[ Kuru Anime Only ]===== //
        if (message.guild.id === "510302403031990272") {
            // =======================================================================================[ Rabbit Cross Post ]===== //
            if (message.channel.id === '526264102859964416') {
                webhooks.rabbit({
                    axios: axios,
                    message: message,
                })
            }
            // =================================================================================[ Waifu Rating Cross Post ]===== //
            if (message.channel.id === '530348718952808449') {
                webhooks.waifuRating({
                    axios: axios,
                    message: message,
                })
            }
            // ================================================================================[ Announcements Cross Post ]===== //
            if (message.channel.id === '526264250230898698') {
                webhooks.announcements({
                    axios: axios,
                    message: message,
                })
            }
        }
        // ===================================================================================================[ All Guild ]===== //
        if (true) {
            // ===========================================================================================[ Modify Prefix ]===== //
            if (message.content.startsWith("/")) {
                prefix({
                    message: message,
                })
            }
        }
    }
    // ===========================================================================[ Direct Message and not the bot itself ]===== //
    if (message.channel.type === 'dm' && Client.user.id !== message.author.id) {
        // ==============================================================================================[ Dialogflow Bot ]===== //
        dialogflow({
            df: dfClient,
            message: message,
        })
    }
})

// =======================================================================================================[ Discord Login ]===== //
Client.login(process.env.BOT_TOKEN)