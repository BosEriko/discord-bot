exports.botList = (message) => {
    message.reply('this is a help message')
        .then(message => {
            message.react('<:arrow_left:>')
        })
        .catch(() => {
            console.log('Error!');
        })
}