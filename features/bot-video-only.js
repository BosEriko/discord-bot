exports.botVideoOnly = (message) => {
    if (!message.cleanContent.match(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)) {
        message.delete()
        message.author.send('Only videos are allowed on **#video**!')
    }
}