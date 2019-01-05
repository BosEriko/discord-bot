exports.botList = (message) => {
    message.reply('this is a help message')
        .then(message => {
            message.react('smiley')
        })
        .catch(() => {
            console.log('Error!');
        })
}