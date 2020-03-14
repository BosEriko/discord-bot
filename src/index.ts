// Guide: https://discordjs.guide/
// DiscordJS Import
const discord = require('discord.js');
const client = new discord.Client();

import { token } from '../config.json';

// Bot Mount Event Trigger
client.on('ready', () => {
  console.log('Bot is ready.');
});

// Bot Message Event Trigger
client.on('message', message => {
  if (message.content === '!ping') {
    // send back "Pong." to the channel the message was sent in
    message.channel.send('Pong.' + token);
  }
});

// Discord Login
client.login(process.env.BOT_TOKEN);
