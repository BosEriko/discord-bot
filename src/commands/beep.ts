module.exports = {
  name: 'beep',
  description: 'Beep!',
  execute(message) {
    message.channel.send('Pong.');
    message.channel.send('Boop.');
  },
};
