const Discord = require('discord.js')
const Client = new Discord.Client()

Client.on('ready', () => {
    console.log('Bot is ready.')
})

Client.on('message', (message: any) => {
    if (Client.user.id !== message.author.id)
        message.reply("Under Maintenance!")
})

// Discord Login
Client.login(process.env.BOT_TOKEN)