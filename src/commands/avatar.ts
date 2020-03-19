module.exports = {
  name: 'avatar',
  description: 'Get Avatar Id',
  execute(message) {
    if (!message.mentions.users.size) {
      return message.channel.send(`Your avatar: ${message.author.avatar}`);
    }
    const avatarList = message.mentions.users.map(user => {
      return `${user.username}'s avatar: ${message.author.avatar}`;
    });
    // send the entire array of strings as a message
    // by default, discord.js will `.join()` the array with `\n`
    message.channel.send(avatarList);
  },
};
