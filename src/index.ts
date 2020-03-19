// Guide: https://discordjs.guide/
// Current Point: https://discordjs.guide/command-handling/adding-features.html#required-arguments
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

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args, adminID);
  }
  catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});

// Discord Login
client.login(process.env.BOT_TOKEN);
