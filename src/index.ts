// Guide: https://discordjs.guide/
// DiscordJS Import
const discord = require('discord.js');
const client = new discord.Client();

import { prefix } from '../config.json';

// Bot Mount Event Trigger
client.on('ready', () => {
  console.log('Bot is ready.');
});

// Bot Message Event Trigger
client.on('message', message => {
  if (message.content === `${prefix}ping`) {
    message.channel.send('Pong.');
  } else if (message.content === `${prefix}beep`) {
    message.channel.send('Boop.');
  }
});

// Discord Login
client.login(process.env.BOT_TOKEN);
