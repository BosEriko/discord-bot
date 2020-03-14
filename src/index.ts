// Guide: https://discordjs.guide/
// DiscordJS Import
const discord = require('discord.js');
const client = new discord.Client();

const prefix = '!';

// Bot Mount Event Trigger
client.on('ready', () => {
  console.log('Bot is ready.');
});

// Bot Message Event Trigger
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    message.channel.send('Pong.');
  }
  else if (command === 'beep') {
    message.channel.send('Boop.');
  }
  else if (command === 'server') {
    message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
  }
  else if (command === 'user-info') {
    message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
  }
});

// Discord Login
client.login(process.env.BOT_TOKEN);
