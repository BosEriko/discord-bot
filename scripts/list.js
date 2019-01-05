exports.botList = (message) => {
    message.channel.send('this is a help message')
    .then(message => {
        message.react('smiley')
    })
    .catch(() => {
        console.log('Error!');
    })
}