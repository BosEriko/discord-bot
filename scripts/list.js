exports.botList = (message) => {
    message.reply('this is a help message')
        .then(message => {
            message.react(':arrow_right:')
        })
        .catch(() => {
            console.log('Error!');
        })
}