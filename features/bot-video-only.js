exports.botVideoOnly = (message) => {
    if (!message.cleanContent.match(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)) {
        message.author.send('Only YouTube videos are allowed on **#video**!')
        message.delete()
    }
}