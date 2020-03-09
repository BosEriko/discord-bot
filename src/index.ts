// tslint:disable: no-any

// DiscordJS Import
const discord = require('discord.js');
const client = new discord.Client();

// Bot Mount Event Trigger
client.on('ready', () => {
  console.log('Bot is ready.');
});

// Bot Message Event Trigger
client.on('message', (message: any) => {
  console.log("Message received.");
});

// Discord Login
client.login(process.env.BOT_TOKEN);
