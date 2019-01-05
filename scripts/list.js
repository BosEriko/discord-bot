exports.botList = (message) => {
    message.reply('this is a help message')
        .then(message => {
            message.react('👍')
        })
        .catch(() => {
            console.log('Error!');
        })
}