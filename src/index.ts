// Guide: https://discordjs.guide/
// Current Point: https://discordjs.guide/command-handling/#individual-command-files
// const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client();

const prefix = ';';
const adminID = '230249439481167872';

client.commands = new discord.Collection();

// const commandFiles = fs.readdirSync('/').filter(file => file.endsWith('.ts'));
const commandFiles = [
  'args-info.ts',
  'avatar.ts',
  'beep.ts',
  'kick.ts',
  'ping.ts',
  'prune.ts',
  'rules.ts',
  'server.ts',
  'user-info.ts',
];

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Bot Mount Event Trigger
client.on('ready', () => {
  console.log('Bot is ready.');
});

// Bot Join Event Trigger
client.on('guildMemberAdd', member => {
  member.send('Welcome to the server!');
});

// Bot Message Event Trigger
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    client.commands.get('ping').execute(message);
  }
  else if (command === 'beep') {
    client.commands.get('beep').execute(message);
  }
  else if (command === 'server') {
    client.commands.get('server').execute(message);
  }
  else if (command === 'user-info') {
    client.commands.get('user-info').execute(message);
  }
  else if (command === 'args-info') {
    client.commands.get('args-info').execute(message, args);
  }
  else if (command === 'kick') {
    client.commands.get('kick').execute(message);
  }
  else if (command === 'avatar') {
    client.commands.get('avatar').execute(message);
  }
  else if (command === 'prune') {
    client.commands.get('prune').execute(message, args, adminID);
  }
  else if (command === 'rules') {
    client.commands.get('rules').execute(message);
  }
});

// Discord Login
client.login(process.env.BOT_TOKEN);
