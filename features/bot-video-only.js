exports.botVideoOnly = (message) => {
    if (!message.cleanContent.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/)) {
        message.author.send('Only YouTube videos are allowed on **#video**!')
        message.delete()
    }
}