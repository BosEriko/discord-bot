module.exports = {
  name: 'server',
  description: 'Server Details',
  execute(message) {
    message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
  },
};
