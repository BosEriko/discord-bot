exports.botElection = (message, Client) => {
    if (message.channel.name === 'kuru-election' && Client.user.id !== message.author.id) {
        message.reply("Kuru Election is Under Maintenance.");
    }
};