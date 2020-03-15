// Guide: https://discordjs.guide/
// Current Point: https://discordjs.guide/creating-your-bot/commands-with-user-input.html#mentions
// DiscordJS Import
const discord = require('discord.js');
const client = new discord.Client();

const prefix = ':';

// Bot Mount Event Trigger
client.on('ready', () => {
  console.log('Bot is ready.');
});

// Bot Message Event Trigger
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
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
  else if (command === 'args-info') {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
    else if (args[0] === 'foo') {
      return message.channel.send('bar');
    }
    message.channel.send(`First argument: ${args[0]}`);
  }
  else if (command === 'kick') {
    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to kick them!');
    }
    else {
      // grab the "first" mentioned user from the message
      // this will return a `User` object, just like `message.author`
      const taggedUser = message.mentions.users.first();
      message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    }
  }
  else if (command === 'avatar') {
    if (!message.mentions.users.size) {
      return message.channel.send(`Your avatar: ${message.author.avatar}`);
    }
  }
});

// Discord Login
client.login(process.env.BOT_TOKEN);
